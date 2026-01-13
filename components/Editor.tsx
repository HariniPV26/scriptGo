'use client'

import { useState } from 'react'
import { generateScript } from '@/app/editor/actions'
import { generateCalendarContent } from '@/app/calendar/actions'
import { Loader2, Save, Copy, Wand2, ArrowLeft, Menu, X, Sparkles, MonitorPlay, Linkedin, Instagram, Languages, Layers, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface EditorProps {
    initialData?: any
    scriptId?: string
}

export default function Editor({ initialData, scriptId }: EditorProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)

    // Calendar mode state
    const [isCalendarMode, setIsCalendarMode] = useState(false)
    const [calendarDays, setCalendarDays] = useState(7)

    const [topic, setTopic] = useState('')
    const [tone, setTone] = useState('Professional')
    const [platform, setPlatform] = useState(initialData?.platform || 'LinkedIn')
    const [title, setTitle] = useState(initialData?.title || '')
    const [language, setLanguage] = useState('English')
    const [framework, setFramework] = useState('None')

    // checking for legacy 'visual' structure or new 'text' structure
    const getInitialContent = () => {
        if (!initialData?.content) return ''
        if (typeof initialData.content === 'string') return initialData.content
        if (initialData.content.text) return initialData.content.text
        if (initialData.content.visual) {
            return initialData.content.visual.map((v: string, i: number) => `[Visual]: ${v}\n[Audio]: ${initialData.content.audio[i]}`).join('\n\n')
        }
        return ''
    }

    const [content, setContent] = useState<string>(getInitialContent())

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setShowMobileSidebar(false)

        try {
            if (isCalendarMode) {
                const params = new URLSearchParams({
                    topic,
                    days: calendarDays.toString(),
                    platform,
                    tone,
                    language,
                    framework,
                    autoGenerate: 'true'
                })
                router.push(`/calendar?${params.toString()}`)
                return
            }
            const result = await generateScript(topic, tone, platform, language, framework)
            setContent(result.text)
            if (!title) setTitle(`${platform} Script: ${topic}`)
        } catch (error) {
            console.error(error)
            alert('Failed to generate')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/login')
            return
        }

        const scriptData = {
            user_id: user.id,
            title: title || 'Untitled Script',
            platform,
            content: { text: content }
        }

        let resultId = scriptId

        if (scriptId) {
            const { error } = await supabase
                .from('scripts')
                .update(scriptData)
                .eq('id', scriptId)

            if (error) {
                console.error("Save error:", error)
                alert("Failed to save")
            }
        } else {
            const { data, error } = await supabase
                .from('scripts')
                .insert(scriptData)
                .select()
                .single()

            if (error) {
                console.error("Save error:", error)
                alert("Failed to save")
            } else if (data) {
                resultId = data.id
            }
        }

        setSaving(false)

        if (resultId) {
            router.push('/dashboard')
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        alert('Script copied to clipboard!')
    }

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background font-sans selection:bg-primary/20">
            {/* Mobile Header */}
            <div className="md:hidden p-4 border-b border-border flex items-center justify-between bg-background/80 backdrop-blur-md z-40">
                <Link href="/dashboard" className="text-muted-foreground">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-bold text-foreground font-outfit">ScriptGo</span>
                </div>
                <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="text-foreground">
                    {showMobileSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Left Sidebar */}
            <div className={`${showMobileSidebar ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-6' : 'hidden md:flex w-80 bg-background/30 backdrop-blur-xl border-r border-white/5 p-6'
                } flex-col transition-all duration-300 relative z-10 custom-scrollbar`}>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="h-10 w-10 bg-muted/50 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors group">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-gradient-to-b from-primary to-purple-500 rounded-full"></div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground font-outfit">Configuration</h2>
                        <p className="text-xs text-muted-foreground">Customize output</p>
                    </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-6 flex-1 overflow-y-auto pb-6 scrollbar-none">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target Platform</label>
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
                                    className={`px-3 py-3 rounded-xl text-[10px] font-bold transition-all duration-200 flex flex-col items-center gap-2 border ${platform === p.name
                                        ? 'bg-primary/10 text-primary border-primary/50 shadow-sm'
                                        : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/50'
                                        }`}
                                >
                                    <p.icon className="h-4 w-4" />
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="topic" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Topic / Goal</label>
                        <textarea
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="What are we creating today?..."
                            required={!scriptId && !content}
                            className="w-full px-4 py-3 bg-muted/30 border border-white/5 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent h-28 resize-none placeholder:text-muted-foreground/50 font-medium text-sm transition-all focus:bg-background"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="tone" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tone</label>
                            <div className="relative">
                                <select
                                    id="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="w-full px-4 py-2.5 appearance-none bg-muted/30 border border-white/5 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:bg-muted/50 transition-colors text-xs font-medium"
                                >
                                    <option>Professional</option>
                                    <option>Friendly</option>
                                    <option>Witty</option>
                                    <option>Persuasive</option>
                                    <option>Edgy</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="language" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                <Languages className="h-3 w-3" /> Language
                            </label>
                            <div className="relative">
                                <select
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-2.5 appearance-none bg-muted/30 border border-white/5 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:bg-muted/50 transition-colors text-xs font-medium"
                                >
                                    <option>English</option>
                                    <option>Tamil</option>
                                    <option>Hindi</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                    <option>German</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="framework" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                <Layers className="h-3 w-3" /> Framework
                            </label>
                            <div className="relative">
                                <select
                                    id="framework"
                                    value={framework}
                                    onChange={(e) => setFramework(e.target.value)}
                                    className="w-full px-4 py-2.5 appearance-none bg-muted/30 border border-white/5 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:bg-muted/50 transition-colors text-xs font-medium"
                                >
                                    <option value="None">None</option>
                                    <option value="AIDA">AIDA</option>
                                    <option value="PAS">PAS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calendar Mode</label>
                            <button
                                type="button"
                                onClick={() => setIsCalendarMode(!isCalendarMode)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${isCalendarMode ? 'bg-primary' : 'bg-muted'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isCalendarMode ? 'translate-x-5' : 'translate-x-0'}`}></span>
                            </button>
                        </div>

                        <div className={`space-y-4 transition-all duration-300 ${isCalendarMode ? 'opacity-100 h-auto' : 'opacity-20 pointer-events-none'}`}>
                            <div className="grid grid-cols-3 gap-1.5">
                                {[7, 15, 30].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setCalendarDays(d)}
                                        className={`py-2 rounded-lg text-[9px] font-black transition-all border ${calendarDays === d
                                            ? 'bg-primary text-white border-primary shadow-sm'
                                            : 'bg-muted/30 text-muted-foreground border-transparent hover:bg-muted'
                                            }`}
                                    >
                                        {d} DAYS
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-[0.98] ${loading ? 'animate-pulse opacity-90' : 'shadow-primary/20 hover:shadow-primary/40'}`}
                    >
                        <div className="flex items-center justify-center gap-2 relative z-10">
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-4 w-4" />
                                    <span>{isCalendarMode ? 'Generate Calendar' : 'Generate Script'}</span>
                                </>
                            )}
                        </div>
                    </button>
                </form>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                {/* Toolbar */}
                <div className="h-auto md:h-20 border-b border-white/5 bg-background/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-3 md:py-0 shrink-0 gap-4 md:gap-0 z-10">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Script"
                        className="bg-transparent text-2xl font-bold font-outfit text-foreground focus:outline-none placeholder:text-muted-foreground/50 w-full md:max-w-md order-2 md:order-1 text-center md:text-left transition-colors"
                    />
                    <div className="flex items-center gap-3 order-1 md:order-2 w-full md:w-auto justify-end">
                        <button
                            onClick={handleCopy}
                            disabled={!content}
                            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium hover:bg-muted/50 rounded-xl"
                        >
                            <Copy className="h-4 w-4" />
                            <span className="hidden sm:inline">Copy</span>
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-1 hidden md:block"></div>
                        <button
                            onClick={handleSave}
                            disabled={saving || !content}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            <span>Save Script</span>
                        </button>
                    </div>
                </div>

                {/* Script Editor Area */}
                <div className="flex-1 overflow-auto p-4 md:p-10 relative z-0 custom-scrollbar bg-black/5 dark:bg-black/20">
                    {!content ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground animate-in fade-in zoom-in-95 duration-500">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                                <div className="h-24 w-24 bg-card rounded-3xl flex items-center justify-center ring-1 ring-white/10 relative z-10 glass-card">
                                    <Wand2 className="h-10 w-10 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground font-outfit mb-2">Ready to write?</h3>
                            <p className="text-muted-foreground">Select a platform and topic on the left to start.</p>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto h-full pb-10 animate-in fade-in slide-in-from-bottom-4">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full min-h-[500px] p-8 md:p-12 bg-card border border-white/5 rounded-3xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none font-mono text-base leading-relaxed shadow-2xl transition-shadow focus:shadow-primary/5"
                                placeholder="Your script will appear here..."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
