import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock, UserPlus } from "lucide-react"

const AUTH_ICON_URL = "https://cdn-icons-png.flaticon.com/512/1791/1791961.png"

export default async function HomePage() {
  const user = await getSession()
  if (user) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <img
                src={AUTH_ICON_URL}
                alt="Ícone de Autenticação"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-4xl font-heading">Sistema de Autenticação</h1>
          <p className="text-xl text-muted-foreground font-sans">Autenticação em NextJs com sessões e cookies</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/login">
              <Lock className="h-5 w-5" />
              Fazer Login
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
            <Link href="/register">
              <UserPlus className="h-5 w-5" />
              Criar Conta
            </Link>
          </Button>
        </div>

        <div className="bg-card border rounded-lg p-6 text-left">
          <h2 className="font-semibold mb-3">Recursos do Sistema:</h2>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Sessões baseadas em cookies (HTTP-only e Secure)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Proteção automática de rotas com middleware</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Registro e login de usuários</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Logout com destruição completa da sessão</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}