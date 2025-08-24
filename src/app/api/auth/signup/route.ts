import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { generateToken, createUserResponse } from '@/lib/auth';
import { CreateUserInput, User } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Processing sign-up request...');
    
    // Parse request body
    const body: CreateUserInput = await request.json();
    const { email, password, firstName, lastName } = body;
    
    // Validate input
    if (!email || !password || !firstName || !lastName) {
      console.log('❌ Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format');
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }
    
    // Validate password strength
    if (password.length < 6) {
      console.log('❌ Password too short');
      return NextResponse.json({
        success: false,
        error: 'Password must be at least 6 characters long'
      }, { status: 400 });
    }
    
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ User already exists');
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 409 });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('🔒 Password hashed successfully');
    
    // Create user object
    const newUser: Omit<User, '_id'> = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      profile: {
        skills: [],
        experience: '',
        education: ''
      },
      roadmaps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    
    // Insert user into database
    const result = await db.collection('users').insertOne(newUser);
    console.log('✅ User created successfully:', result.insertedId);
    
    // Generate JWT token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    });
    
    // Create response (without password)
    const userResponse = createUserResponse({
      ...newUser,
      _id: result.insertedId
    });
    
    console.log('🎉 Sign-up completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userResponse,
      token: token
    }, { status: 201 });
    
  } catch (error) {
    console.error('❌ Sign-up error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
