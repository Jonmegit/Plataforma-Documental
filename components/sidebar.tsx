"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, FolderKanban, Building2, CreditCard, User, Menu, X } from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Documentos",
    icon: FileText,
    href: "/dashboard/documents",
    color: "text-violet-500",
  },
  {
    label: "Categorías",
    icon: FolderKanban,
    href: "/dashboard/categories",
    color: "text-pink-700",
  },
  {
    label: "Empresas",
    icon: Building2,
    href: "/dashboard/companies",
    color: "text-orange-500",
  },
  {
    label: "Suscripciones",
    icon: CreditCard,
    href: "/dashboard/subscriptions",
    color: "text-emerald-500",
  },
  {
    label: "Perfil",
    icon: User,
    href: "/dashboard/profile",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <div
        className={cn(
          "relative hidden h-full flex-col bg-slate-900 p-4 text-white md:flex",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold">DocManager</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleSidebar}>
            {isCollapsed ? <Menu /> : <X className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-white",
                pathname === route.href && "bg-slate-800 text-white",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 left-4 z-50 md:hidden">
        <Button
          variant="default"
          size="icon"
          className="h-10 w-10 rounded-full bg-slate-900 shadow-lg"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {isCollapsed && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleSidebar} />}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 p-4 text-white transition-transform md:hidden",
          isCollapsed ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">DocManager</span>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-white",
                pathname === route.href && "bg-slate-800 text-white",
              )}
              onClick={toggleSidebar}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
