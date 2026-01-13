'use client'

import { createClient } from '@/utils/supabase/client'
import { LogOut, Sparkles, Calendar, LayoutDashboard, Settings, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ModeToggle } from './mode-toggle'
import { ThemePicker } from './theme-picker'
import { useState } from 'react'

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.refresh()
    }

    const navLinks = [
        { href: '/dashboard', label: 'Workshop', icon: LayoutDashboard },
        { href: '/calendar', label: 'Calendar', icon: Calendar },
        { href: '/editor', label: 'Editor', icon: Settings }, // Assuming editor route exists or using Settings as placeholder
    ]

    return (
        <>
            <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50 transition-all supports-[backdrop-filter]:bg-background/20">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-tight text-foreground transition-colors">ScriptGo</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            const isActive = pathname === link.href

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group
                                        ${isActive
                                            ? 'text-foreground bg-white/5'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary mb-1"></span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
                        <ThemePicker />
                        <ModeToggle />
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        title="Sign Out"
                    >
                        <span>Sign out</span>
                        <LogOut className="h-3.5 w-3.5" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl p-6 animate-in slide-in-from-top-4">
                    <nav className="scan-y-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-colors
                                    ${pathname === link.href
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                    }`}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ThemePicker />
                            <ModeToggle />
                        </div>
                        <button
                            onClick={() => {
                                handleSignOut()
                                setMobileMenuOpen(false)
                            }}
                            className="text-sm font-medium text-red-400 hover:text-red-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
