// joaoof/authenticator/authenticator-5907e12f4b91c77facd89083cf831678601d02bf/app/login/page.tsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function LoginPage() {
  const user = await getSession();

  if (user) {
    redirect("/dashboard");
  }

  return (
    // min-h-screen: Garante que o contêiner principal ocupe 100% da altura
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header (apenas em telas pequenas) */}
      <div className="md:hidden flex items-center justify-center py-6 bg-primary/5">
        <h1 className="text-2xl font-bold text-primary">Coffee House</h1>
      </div>

      {/* Imagem de fundo (apenas em telas médias+) */}
      {/* h-screen: Força o contêiner da imagem a ter 100% da altura do viewport no desktop */}
      <div className="hidden md:flex md:w-1/2 relative h-screen bg-muted">
        <Image
          // CORREÇÃO: Usando o nome do arquivo que você enviou (image_25f90e.png)
          src="/image_25f90e.png"
          alt="Ambiente acolhedor de uma cafeteria com luz natural e mesas de madeira"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Coffee House
          </h1>
          <p className="text-lg text-white/90 max-w-md leading-relaxed">
            O lugar perfeito para saborear cada gole com tranquilidade e estilo.
          </p>
        </div>
      </div>

      {/* Formulário de Login */}
      {/* w-full md:w-1/2: Garante que o formulário ocupe a outra metade da tela no desktop */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Desktop Title (escondido em mobile) */}
          <div className="hidden md:block text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h2>
            <p className="text-muted-foreground mt-2">
              Faça login para continuar sua jornada com a gente.
            </p>
          </div>

          <Card className="border-none shadow-lg md:shadow-xl rounded-xl">
            <CardHeader className="space-y-2 text-center pb-2">
              <CardTitle className="text-2xl font-bold text-foreground md:hidden">
                Login
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Insira suas credenciais abaixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Ainda não tem uma conta?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline"
                    aria-label="Cadastrar nova conta"
                  >
                    Registre-se
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Coffee House. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}