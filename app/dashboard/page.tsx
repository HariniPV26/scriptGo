'use client'

import { createClient } from '@/utils/supabase/client'
import Header from '@/components/Header'
import Link from 'next/link'
import { Plus, FileText, Calendar, Loader2, Trash2, BarChart3, TrendingUp, Zap, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [scripts, setScripts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (!confirm('Are you sure you want to delete this script?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('scripts')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete error:', error)
            alert('Failed to delete script')
        } else {
            setScripts(scripts.filter(s => s.id !== id))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            setUser(user)

            const { data: scriptsData } = await supabase
                .from('scripts')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (scriptsData) {
                setScripts(scriptsData)
            }
            setLoading(false)
        }

        fetchData()
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Calculate stats
    const totalScripts = scripts.length
    const thisWeek = scripts.filter(s => {
        const created = new Date(s.created_at)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return created > weekAgo
    }).length

    const platformCounts = scripts.reduce((acc, script) => {
        const platform = script.platform || 'Other'
        acc[platform] = (acc[platform] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <Header />

            <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="space-y-1">
                        <h1 className="font-outfit text-3xl font-bold tracking-tight">Your Workshop</h1>
                        <p className="text-muted-foreground">Manage and create your viral content.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/calendar"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background/50 hover:bg-muted/50 px-4 text-sm font-medium transition-all hover:scale-105"
                        >
                            <Calendar className="h-4 w-4" />
                            Calendar
                        </Link>
                        <Link
                            href="/editor"
                            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
                        >
                            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                            New Script
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                {scripts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {/* Total Scripts */}
                        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group border border-gray-100 shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                            </div>

                            <p className="text-sm font-medium text-gray-600">Total Scripts</p>
                            <p className="font-outfit text-4xl font-bold mt-2 text-gray-900">{totalScripts}</p>
                            <div className="mt-2 text-xs flex items-center gap-1 text-emerald-600 font-medium">
                                <TrendingUp className="h-3 w-3" />
                                <span>Lifetime output</span>
                            </div>
                        </div>

                        {/* This Week */}
                        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group border border-gray-100 shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-emerald-500" />
                                </div>
                            </div>

                            <p className="text-sm font-medium text-gray-600">This Week</p>
                            <p className="font-outfit text-4xl font-bold mt-2 text-gray-900">{thisWeek}</p>
                            <div className="mt-2 text-xs flex items-center gap-1 text-gray-500">
                                <span>Recent activity</span>
                            </div>
                        </div>

                        {/* Top Platform */}
                        <div className="bg-white rounded-2xl p-6 relative overflow-hidden group border border-gray-100 shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-purple-500" />
                                </div>
                            </div>

                            <p className="text-sm font-medium text-gray-600">Top Platform</p>
                            <p className="font-outfit text-4xl font-bold mt-2 truncate max-w-[80%] text-gray-900">{Object.keys(platformCounts)[0] || 'None'}</p>
                            <p className="mt-2 text-xs text-gray-500">
                                {(Object.values(platformCounts)[0] as number) || 0} scripts generated
                            </p>
                        </div>
                    </div>
                )}

                {/* Scripts Grid */}
                {(!scripts || scripts.length === 0) ? (
                    <div className="relative flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-border bg-muted/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50"></div>
                        <div className="relative z-10 text-center">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-6 mx-auto shadow-inner border border-white/10">
                                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-outfit">Your canvas is empty</h3>
                            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                                The world is waiting for your story. Let AI kickstart your creative process.
                            </p>
                            <Link
                                href="/editor"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all"
                            >
                                <Plus className="h-5 w-5" />
                                Create Your First Script
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scripts.map((script, index) => (
                            <Link
                                key={script.id}
                                href={`/editor?id=${script.id}`}
                                className="group relative rounded-2xl border border-white/5 bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 animate-in fade-up fill-mode-both"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`
                                        inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border 
                                        ${script.platform === 'LinkedIn' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                            script.platform === 'YouTube' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                script.platform === 'TikTok' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' :
                                                    'bg-gray-500/10 text-gray-500 border-gray-500/20'}
                                    `}>
                                        {script.platform || 'General'}
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => handleDelete(e, script.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-outfit font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                    {script.title || 'Untitled Script'}
                                </h3>

                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold mb-3 block">
                                    {new Date(script.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>

                                {/* Preview */}
                                <div className="rounded-xl bg-background/50 p-4 border border-white/5 h-24 overflow-hidden relative">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {(script.content as any)?.text?.substring(0, 150) || (script.content as any)?.visual?.[0] || 'No preview available...'}
                                    </p>
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/90 to-transparent"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
