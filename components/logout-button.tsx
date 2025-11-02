"use client"

import { logoutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="outline" size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Sair
      </Button>
    </form>
  )
}
