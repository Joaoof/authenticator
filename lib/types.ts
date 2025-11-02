export interface User {
  id: string
  username: string
  name: string
  email?: string
  createdAt: Date
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  name: string
  email?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export interface SessionData {
  username: string
  userId: string
  expiresAt: Date
}
