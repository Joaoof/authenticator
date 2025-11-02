import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")
  const username = request.cookies.get("username")

  // Verifica se está tentando acessar uma rota protegida
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Se não tiver sessão, redireciona para login
    if (!sessionId || !username) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
