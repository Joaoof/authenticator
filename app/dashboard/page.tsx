import { requireAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"
import { User, Shield, Clock } from "lucide-react"

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo, {}!</h2>
          <p className="text-muted-foreground">Você está autenticado no sistema</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuário</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{}</div>
              <p className="text-xs text-muted-foreground mt-1">Nome de usuário ativo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Ativo</div>
              <p className="text-xs text-muted-foreground mt-1">Sessão autenticada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessão</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 dias</div>
              <p className="text-xs text-muted-foreground mt-1">Tempo de expiração</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Área Protegida</CardTitle>
            <CardDescription>Esta página só pode ser acessada por usuários autenticados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">O sistema de autenticação funciona de forma similar ao PHP:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Sessões são armazenadas em cookies HTTP-only</li>
              <li>Middleware protege rotas automaticamente</li>
              <li>Logout destrói a sessão completamente</li>
              <li>Redirecionamento automático para login se não autenticado</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
