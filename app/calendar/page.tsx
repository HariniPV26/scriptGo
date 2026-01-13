'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import {
    Calendar as CalendarIcon,
    Wand2,
    Loader2,
    ChevronRight,
    MonitorPlay,
    Linkedin,
    Instagram,
    Sparkles,
    Languages,
    Layers,
    Clock,
    CheckCircle2,
    X,
    Copy,
    Hash,
    Save
} from 'lucide-react'
import { generateCalendarContent } from './actions'

export default function ContentCalendarPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [authLoading, setAuthLoading] = useState(true)

    // Form state
    const [topic, setTopic] = useState('')
    const [days, setDays] = useState(7)
    const [platform, setPlatform] = useState('LinkedIn')
    const [tone, setTone] = useState('Professional')
    const [language, setLanguage] = useState('English')

    const [framework, setFramework] = useState('None')
    // new Date().toISOString().split('T')[0] gives YYYY-MM-DD
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])

    // Result state
    const [calendarItems, setCalendarItems] = useState<any[]>([])
    const [selectedItem, setSelectedItem] = useState<any>(null)

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
            } else {
                setUser(user)

                // Handle search params for auto-generation
                const searchParams = new URLSearchParams(window.location.search)
                const topicParam = searchParams.get('topic')
                const daysParam = searchParams.get('days')
                const platformParam = searchParams.get('platform')
                const toneParam = searchParams.get('tone')
                const langParam = searchParams.get('language')
                const frameworkParam = searchParams.get('framework')
                const autoGen = searchParams.get('autoGenerate')

                if (topicParam) setTopic(topicParam)
                if (daysParam) setDays(parseInt(daysParam))
                if (platformParam) setPlatform(platformParam)
                if (toneParam) setTone(toneParam)
                if (langParam) setLanguage(langParam)
                if (frameworkParam) setFramework(frameworkParam)

                if (autoGen === 'true' && topicParam) {
                    setTimeout(() => {
                        const form = document.querySelector('form')
                        if (form) form.requestSubmit()
                    }, 500)
                }
            }
            setAuthLoading(false)
        }
        checkUser()
    }, [router])

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await generateCalendarContent(topic, days, tone, platform, language, framework, startDate)
            if (result.items && result.items.length > 0) {
                setCalendarItems(result.items)
            } else if (result.error) {
                alert(result.error)
            } else {
                alert('No content was generated. Please try again.')
            }
        } catch (error: any) {
            console.error('Generation error:', error)
            alert(`Failed to generate calendar: ${error?.message || 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveAll = async () => {
        if (!user) {
            router.push('/login')
            return
        }

        setSaving(true)
        const supabase = createClient()

        try {
            const scriptsToInsert = calendarItems.map(item => {
                const date = new Date(startDate)
                date.setDate(date.getDate() + (item.day - 1))

                return {
                    user_id: user.id,
                    title: item.title,
                    platform: platform,
                    content: { text: item.content },
                    label: item.label,
                    scheduled_for: date.toISOString(),
                    created_at: new Date().toISOString()
                }
            })

            const { error } = await supabase
                .from('scripts')
                .insert(scriptsToInsert)

            if (error) throw error

            alert(`Successfully saved ${calendarItems.length} posts to your Workshop!`)
            router.push('/dashboard')
        } catch (error) {
            console.error('Save All Error:', error)
            alert('Failed to save posts.')
        } finally {
            setSaving(false)
        }
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
            <Header />

            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
                {/* Sidebar Configuration */}
                <aside className="w-full md:w-80 border-r border-white/5 bg-background/30 backdrop-blur-xl p-6 overflow-y-auto shrink-0 transition-all custom-scrollbar z-10 relative">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-outfit font-bold">Plan Content</h2>
                            <p className="text-xs text-muted-foreground">AI Strategy Generator</p>
                        </div>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-6 pb-20">
                        {/* Days Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <Clock className="h-3 w-3" /> Duration
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[7, 15, 30].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setDays(d)}
                                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${days === d
                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                            : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                                            }`}
                                    >
                                        {d} Days
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* Start Date */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <CalendarIcon className="h-3 w-3" /> Start Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 bg-muted/30 border border-white/5 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground [color-scheme:dark]"
                            />
                        </div>

                        {/* Platform */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Platform</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { name: 'LinkedIn', icon: Linkedin },
                                    { name: 'YouTube', icon: MonitorPlay },
                                    { name: 'TikTok', icon: Sparkles },
                                    { name: 'Instagram', icon: Instagram }
                                ].map((p) => (
                                    <button
                                        key={p.name}
                                        type="button"
                                        onClick={() => setPlatform(p.name)}
                                        className={`p-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-2 border ${platform === p.name
                                            ? 'bg-primary/10 text-primary border-primary/50 shadow-sm'
                                            : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50 hover:text-foreground'
                                            }`}
                                    >
                                        <p.icon className="h-4 w-4" />
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Topic */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Topic / Goal</label>
                            <textarea
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="E.g. Daily productivity tips for remote workers..."
                                required
                                className="w-full px-4 py-3 bg-muted/30 border border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 h-28 resize-none font-medium placeholder:text-muted-foreground/50 transition-all focus:bg-background"
                            />
                        </div>

                        {/* Tone */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tone</label>
                            <div className="relative">
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="w-full px-4 py-3 bg-muted/30 border border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-medium cursor-pointer hover:bg-muted/50 transition-colors text-foreground"
                                >
                                    <option>Professional</option>
                                    <option>Friendly</option>
                                    <option>Witty</option>
                                    <option>Persuasive</option>
                                    <option>Edgy</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Advanced Options (Language & Framework) */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Languages className="h-3 w-3" /> Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-3 py-2 bg-muted/30 border border-white/5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                                >
                                    <option>English</option>
                                    <option>Tamil</option>
                                    <option>Hindi</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                    <option>German</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                    <Layers className="h-3 w-3" /> Framework
                                </label>
                                <select
                                    value={framework}
                                    onChange={(e) => setFramework(e.target.value)}
                                    className="w-full px-3 py-2 bg-muted/30 border border-white/5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"
                                >
                                    <option value="None">None</option>
                                    <option value="AIDA">AIDA</option>
                                    <option value="PAS">PAS</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 group"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>
                                <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                                Generate Calendar
                            </>}
                        </button>
                    </form>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-10 overflow-auto relative custom-scrollbar bg-black/5 dark:bg-black/20">

                    {calendarItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                                <div className="h-24 w-24 bg-background/50 backdrop-blur-xl rounded-3xl flex items-center justify-center ring-1 ring-white/10 relative z-10 glass-card">
                                    <CalendarIcon className="h-10 w-10 text-primary" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-outfit font-bold mb-4 tracking-tight">Your Content Journey Starts Here</h2>
                            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-lg">
                                Use the AI tool on the left to generate your {days}-day content strategy.
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 glass-card p-6 rounded-2xl sticky top-0 z-20 backdrop-blur-xl border border-white/10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">STRATEGY</span>
                                        <span className="text-xs text-muted-foreground">{days} Days</span>
                                    </div>
                                    <h2 className="text-2xl font-bold font-outfit truncate max-w-md">
                                        {topic}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden md:flex flex-col items-end mr-4">
                                        <span className="text-xs font-bold">{calendarItems.length} Posts</span>
                                        <span className="text-[10px] text-muted-foreground">{platform} • {language}</span>
                                    </div>
                                    <button
                                        onClick={handleSaveAll}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                                    >
                                        {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                                        <span>Save All to Workshop</span>
                                    </button>
                                </div>
                            </div>

                            <div className={`grid gap-4 ${days === 30 ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                {calendarItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`group bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col ${days === 30 ? 'aspect-square md:aspect-auto' : ''}`}
                                    >
                                        <div className={`p-5 flex-1 ${days === 30 ? 'flex flex-col' : ''}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-primary mb-0.5">
                                                        {(() => {
                                                            const d = new Date(startDate);
                                                            d.setDate(d.getDate() + (item.day - 1));
                                                            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
                                                        })()}
                                                    </span>
                                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold bg-white/5 px-1.5 py-0.5 rounded w-fit">
                                                        {item.label || 'Post'}
                                                    </span>
                                                </div>
                                                <div className="h-8 w-8 rounded-full bg-background/50 flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors">
                                                    {platform === 'LinkedIn' ? <Linkedin className="h-4 w-4 text-blue-500" /> :
                                                        platform === 'YouTube' ? <MonitorPlay className="h-4 w-4 text-red-500" /> :
                                                            <Sparkles className="h-4 w-4 text-pink-500" />}
                                                </div>
                                            </div>
                                            <h3 className={`font-bold font-outfit text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors ${days === 30 ? 'text-xs' : 'text-base'}`}>
                                                {item.title}
                                            </h3>
                                            {days !== 30 && (
                                                <p className="text-muted-foreground text-xs line-clamp-3 leading-relaxed opacity-70 mb-4 font-medium">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="w-full py-3 bg-muted/20 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            {days === 30 ? 'OPEN' : 'READ SCRIPT'}
                                            <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Premium Modal */}
            {
                selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 perspective-1000">
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity animate-in fade-in" onClick={() => setSelectedItem(null)}></div>
                        <div className="relative bg-card/90 border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 ring-1 ring-white/10">

                            {/* Modal Header */}
                            <div className="p-6 md:p-8 border-b border-white/5 flex items-start justify-between bg-black/20">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                                        <span className="font-outfit font-black text-primary text-sm">Day {selectedItem.day}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-outfit font-bold text-2xl leading-tight mb-1">{selectedItem.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{platform}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{tone} Tone</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCopy(selectedItem.content)}
                                        className="p-2.5 rounded-xl bg-muted/50 hover:bg-primary hover:text-white transition-colors text-muted-foreground group"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="h-5 w-5 group-active:scale-90 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="p-2.5 rounded-xl bg-muted/50 hover:bg-red-500/10 hover:text-red-500 transition-colors text-muted-foreground"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 md:p-10 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-primary/20 bg-black/10 custom-scrollbar">
                                {selectedItem.content}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center">
                                <span className="text-xs font-mono text-muted-foreground opacity-50">AI Generated Content • {new Date().getFullYear()}</span>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all"
                                >
                                    Done Reading
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}
