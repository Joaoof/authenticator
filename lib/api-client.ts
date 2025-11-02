import type { LoginRequest, RegisterRequest, AuthResponse, User } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export class ApiClient {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erro desconhecido" }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async getCurrentUser(token: string): Promise<User> {
    return this.request<User>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  static async logout(token: string): Promise<void> {
    return this.request<void>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
