"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Home, FileText, Users, Settings, LogOut, Menu, User, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "student" | "industry-supervisor" | "school-supervisor" | "admin"
  userName: string
}

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getNavItems = () => {
    const baseItems = [{ href: `/${userRole}/dashboard`, label: "Dashboard", icon: Home }]

    switch (userRole) {
      case "student":
        return [
          ...baseItems,
          { href: "/student/logbook", label: "Logbook Entry", icon: FileText },
          // { href: "/student/profile", label: "Profile", icon: User },
        ]
      case "industry-supervisor":
        return [
          ...baseItems,
          { href: "/industry-supervisor/students", label: "My Students", icon: Users },
          // { href: "/industry-supervisor/profile", label: "Profile", icon: User },
        ]
      case "school-supervisor":
        return [
          ...baseItems,
          // { href: "/school-supervisor/logbooks", label: "Student Logbooks", icon: FileText },
          // { href: "/school-supervisor/visits", label: "Visit Reports", icon: Users },
        ]
      case "admin":
        return [
          ...baseItems,
          { href: "/admin/users", label: "User Management", icon: Users },
          // { href: "/admin/reports", label: "Reports", icon: FileText },
          // { href: "/admin/settings", label: "Settings", icon: Settings },
        ]
      default:
        return baseItems
    }
  }

  const navItems = getNavItems()

  const handleLogout = () => {
    router.push("/auth")
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "industry-supervisor":
        return "Industry Supervisor"
      case "school-supervisor":
        return "School Supervisor"
      case "admin":
        return "Administrator"
      default:
        return "Student"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">SIWES</span>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold hidden sm:block">SIWES Logbook</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                  <AvatarFallback>{getUserInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{getRoleDisplayName(userRole)}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
          <div className="flex-1 flex flex-col min-h-0 pt-6">
            <nav className="flex-1 px-4 space-y-2">
              <img src="/siwes.png" className="w-24 mb-8 mx-auto aspect-square" alt="Logo" />
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
