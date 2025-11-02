import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Simulação de banco de dados de usuários (em produção, use um banco real)
const users = new Map<string, { username: string; password: string; name: string }>()

// Inicializa com um usuário de exemplo
users.set("admin", {
  username: "admin",
  password: "admin123", // Em produção, use hash de senha!
  name: "Administrador",
})

export interface User {
  username: string
  name: string
}

// Cria uma sessão (similar ao session_start() do PHP)
export async function createSession(username: string) {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
  const cookieStore = await cookies()

  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  cookieStore.set("username", username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
}

// Verifica se o usuário está autenticado (similar ao isset($_SESSION['user']) do PHP)
export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")
  const username = cookieStore.get("username")

  if (!sessionId || !username) {
    return null
  }

  const user = users.get(username.value)
  if (!user) {
    return null
  }

  return {
    username: user.username,
    name: user.name,
  }
}

// Destrói a sessão (similar ao session_destroy() do PHP)
export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session_id")
  cookieStore.delete("username")
}

// Verifica credenciais de login
export async function verifyCredentials(username: string, password: string): Promise<User | null> {
  const user = users.get(username)

  if (!user || user.password !== password) {
    return null
  }

  return {
    username: user.username,
    name: user.name,
  }
}

// Registra um novo usuário
export async function registerUser(username: string, password: string, name: string): Promise<boolean> {
  if (users.has(username)) {
    return false
  }

  users.set(username, { username, password, name })
  return true
}

// Middleware helper - redireciona se não estiver autenticado
export async function requireAuth() {
  const user = await getSession()
  if (!user) {
    redirect("/login")
  }
  return user
}
