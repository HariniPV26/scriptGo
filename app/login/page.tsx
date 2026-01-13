'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Loader2, Sparkles, CheckCircle2, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        if (searchParams.get('tab') === 'signup') {
            setIsLogin(false)
        }
    }, [searchParams])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) {
                    setError(error.message)
                } else {
                    router.push('/dashboard')
                    router.refresh()
                }
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) {
                    setError(error.message)
                } else {
                    router.push('/dashboard')
                    router.refresh()
                }
            }
        } catch (e) {
            console.error("Login Error:", e)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-background font-sans">

            {/* LEFT SIDE - VISUAL & TESTIMONIAL (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-muted text-white overflow-hidden flex-col justify-between p-12">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-zinc-900"></div>
                    {/* Mesh Gradient Overlay */}
                    <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-outfit font-bold text-xl tracking-tight">ScriptGo</span>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <div className="mb-8 space-y-6">
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium text-gray-200">
                                        {i === 1 ? 'Generate viral hooks in seconds' : i === 2 ? 'Seamless multi-platform adaptation' : 'Export directly to your calendar'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-white/10 shadow-xl">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                        </div>
                        <blockquote className="text-lg font-medium leading-relaxed mb-4 text-gray-900">
                            "ScriptGo has completely transformed my content workflow. I used to spend hours writing Scripts, now I generate a week's worth in minutes."
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-primary"></div>
                            <div>
                                <div className="font-bold text-gray-900">Sarah Jenkins</div>
                                <div className="text-sm text-gray-500">Content Creator @ TechFlow</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-gray-500">
                    © 2026 ScriptGo Inc. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                <div className="w-full max-w-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Mobile Logo (Visible only on mobile) */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                    </div>

                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="font-outfit text-3xl font-bold tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-muted-foreground">
                            {isLogin
                                ? 'Enter your details to access your workspace.'
                                : 'Start your 14-day free trial. No credit card required.'}
                        </p>
                    </div>

                    <div className="flex p-1 bg-muted/50 rounded-xl mb-6">
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin
                                ? 'bg-background shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin
                                ? 'bg-background shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        await handleSubmit(formData)
                    }} className="space-y-5">

                        {error && (
                            <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg animate-in fade-in">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="flex h-11 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none icon" htmlFor="password">
                                    Password
                                </label>
                                {isLogin && (
                                    <Link href="#" className="text-xs font-medium text-primary hover:underline tab-index-[-1]">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="flex h-11 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-full shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="#" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <LoginContent />
        </Suspense>
    )
}
