import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { generateToken, createUserResponse } from '@/lib/auth';
import { LoginInput } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Processing sign-in request...');
    
    // Parse request body
    const body: LoginInput = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }
    
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Find user by email
    const user = await db.collection('users').findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });
    
    if (!user) {
      console.log('❌ User not found or inactive');
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      }, { status: 401 });
    }
    
    console.log('✅ Password verified successfully');
    
    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { 
        $set: { 
          lastLogin: new Date(),
          updatedAt: new Date()
        } 
      }
    );
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
    
    // Create response (without password)
    const userResponse = createUserResponse(user);
    
    console.log('🎉 Sign-in completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Sign-in successful',
      user: userResponse,
      token: token
    });
    
  } catch (error) {
    console.error('❌ Sign-in error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
