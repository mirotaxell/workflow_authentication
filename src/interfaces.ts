import {Document} from 'mongoose';

export interface User extends Document {
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}

export interface OutputUser {
  id: string;
  full_name: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface DBMessageResponse {
  message: string;
  user: OutputUser;
}

export interface MessageResponse {
  message: string;
  id?: number;
}

export interface LoginMessageResponse {
  token: string;
  message: string;
  user: OutputUser;
}

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}
