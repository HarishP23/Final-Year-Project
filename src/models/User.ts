import { ObjectId } from 'mongodb';

// User interface for TypeScript
export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // hashed password
  firstName: string;
  lastName: string;
  profile: {
    avatar?: string;
    bio?: string;
    skills: string[];
    experience: string;
    education: string;
    location?: string;
    phone?: string;
  };
  roadmaps: ObjectId[]; // array of roadmap IDs
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

// User creation interface (without _id and timestamps)
export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// User update interface (partial)
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  profile?: Partial<User['profile']>;
}

// User response interface (without password)
export interface UserResponse {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  profile: User['profile'];
  roadmaps: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

// Login interface
export interface LoginInput {
  email: string;
  password: string;
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}
