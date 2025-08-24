import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/models/User';

// JWT secret key (in production, this should be a strong secret)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // 7 days

/**
 * Generate JWT token for a user
 */
export function generateToken(payload: JWTPayload): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
      issuer: 'career-guidance-agent',
      audience: 'career-guidance-users'
    });
    
    console.log('🔑 JWT token generated successfully');
    return token;
  } catch (error) {
    console.error('❌ Error generating JWT token:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'career-guidance-agent',
      audience: 'career-guidance-users'
    }) as JWTPayload;
    
    console.log('✅ JWT token verified successfully');
    return decoded;
  } catch (error) {
    console.error('❌ Error verifying JWT token:', error);
    throw new Error('Invalid or expired authentication token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Create a user response object (without sensitive data)
 */
export function createUserResponse(user: any): any {
  const { password, ...userResponse } = user;
  return {
    ...userResponse,
    _id: user._id?.toString() || user._id
  };
}
