'use client'

import { useState, useEffect } from 'react'
import { Sparkles, MonitorPlay, Wand2, Loader2, Linkedin } from 'lucide-react'

export default function DemoSimulator() {
    const [step, setStep] = useState<'idle' | 'typing' | 'generating' | 'done'>('idle')
    const [topic, setTopic] = useState('')
    const [result, setResult] = useState('')
    const [cursorVisible, setCursorVisible] = useState(true)

    const fullTopic = "How to start a successful coding career in 2026"
    const fullResult = `[intro]
Hey everyone! Welcome back to the channel.
If you want to become a software engineer in 2026...
You are in the right place.

[body]
Step 1: Focus on Fundamentals.
Don't just learn frameworks. Learn how computers work.
Step 2: Build Real Projects.
Stop watching tutorials. Start coding.

[outro]
Thanks for watching!
Subscribe for more coding tips.`

    useEffect(() => {
        let isMounted = true

        // Blinking cursor
        const cursorInterval = setInterval(() => {
            if (isMounted) setCursorVisible(v => !v)
        }, 500)

        const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

        const startSimulation = async () => {
            // Wait a bit before starting
            await delay(1000)
            if (!isMounted) return

            // Step 1: Typing
            setStep('typing')
            for (let i = 0; i <= fullTopic.length; i++) {
                if (!isMounted) return
                setTopic(fullTopic.slice(0, i))
                await delay(50 + Math.random() * 50)
            }

            await delay(800)
            if (!isMounted) return

            // Step 2: Generating
            setStep('generating')
            await delay(1500)
            if (!isMounted) return

            // Step 3: Done (Streaming result)
            setStep('done')
            for (let i = 0; i <= fullResult.length; i++) {
                if (!isMounted) return
                setResult(fullResult.slice(0, i))
                await delay(10)
            }

            // Reset after a delay to loop
            await delay(5000)
            if (!isMounted) return

            setTopic('')
            setResult('')
            setStep('idle')
            startSimulation()
        }

        startSimulation()

        return () => {
            isMounted = false
            clearInterval(cursorInterval)
        }
    }, [])

    return (
        <div className="w-full h-full bg-card/90 flex flex-col md:flex-row overflow-hidden text-left relative">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 bg-muted/30 border-r border-border p-4 flex flex-col gap-4">
                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Platform</div>
                    <div className="flex gap-2">
                        <div className="flex-1 p-2 bg-primary/10 text-primary border border-primary/20 rounded-lg flex items-center justify-center gap-2 text-xs font-medium">
                            <MonitorPlay className="h-3 w-3" /> YouTube
                        </div>
                        <div className="flex-1 p-2 bg-card border border-border rounded-lg flex items-center justify-center gap-2 text-xs font-medium opacity-50">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Topic</div>
                    <div className="p-3 bg-background border border-border rounded-lg h-24 text-sm relative">
                        {topic}
                        {step === 'typing' && cursorVisible && <span className="border-r-2 border-primary ml-0.5 animate-pulse"></span>}
                    </div>
                </div>

                <button
                    className={`mt-2 w-full py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2
                ${step === 'generating'
                            ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                            : 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-100'}`}
                >
                    {step === 'generating' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                    {step === 'generating' ? 'Writing Script...' : 'Generate Script'}
                </button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 bg-background/50 p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                {step === 'idle' || step === 'typing' ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30">
                        <Sparkles className="h-12 w-12 mb-2" />
                        <p>AI Generator Ready</p>
                    </div>
                ) : step === 'generating' ? (
                    <div className="h-full flex flex-col items-center justify-center text-primary">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p className="text-xs font-medium animate-pulse">Thinking...</p>
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap animate-in fade-in duration-500">
                        {result}
                        {step === 'done' && cursorVisible && <span className="inline-block w-2 h-4 bg-primary ml-1 align-middle"></span>}
                    </div>
                )}

                {/* Fake Toolbar */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-border/50 bg-background/80 backdrop-blur w-full flex items-center justify-between px-4">
                    <div className="text-xs font-bold text-muted-foreground">Untitled Script</div>
                    <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-400"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                        <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
