export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateLogin(username: string, password: string): ValidationResult {
  const errors: Record<string, string> = {}

  if (!username || username.trim().length === 0) {
    errors.username = "Usuário é obrigatório"
  }

  if (!password || password.length === 0) {
    errors.password = "Senha é obrigatória"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRegister(username: string, password: string, name: string, email?: string): ValidationResult {
  const errors: Record<string, string> = {}

  if (!username || username.trim().length < 3) {
    errors.username = "Usuário deve ter pelo menos 3 caracteres"
  }

  if (!password || password.length < 6) {
    errors.password = "Senha deve ter pelo menos 6 caracteres"
  }

  if (!name || name.trim().length < 2) {
    errors.name = "Nome deve ter pelo menos 2 caracteres"
  }

  if (email && email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = "Email inválido"
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
