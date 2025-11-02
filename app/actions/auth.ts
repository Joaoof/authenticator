"use server"

import { createSession, destroySession, verifyCredentials, registerUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Usuário e senha são obrigatórios" }
  }

  const user = await verifyCredentials(username, password)

  if (!user) {
    return { error: "Usuário ou senha inválidos" }
  }

  await createSession(username)
  redirect("/dashboard")
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!username || !password || !name) {
    return { error: "Todos os campos são obrigatórios" }
  }

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres" }
  }

  const success = await registerUser(username, password, name)

  if (!success) {
    return { error: "Usuário já existe" }
  }

  await createSession(username)
  redirect("/dashboard")
}

export async function logoutAction() {
  await destroySession()
  redirect("/login")
}
