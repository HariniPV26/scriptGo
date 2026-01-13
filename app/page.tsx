'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Zap,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Users,
  BarChart3,
  Clock,
  Play,
  Layers,
  Code2,
  Share2,
  Lock,
  Globe2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden selection:bg-primary/30">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-purple-500/5 blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-outfit font-bold text-2xl tracking-tight">ScriptGo</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/login?tab=signup"
              className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl bg-primary px-6 font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-100 transition-opacity group-hover:opacity-90"></div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className={`space-y-8 ${mounted ? 'animate-in fade-up duration-1000' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">v2.0 Now Live</span>
              </div>

              <h1 className="font-outfit text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                Create Viral Content <br />
                <span className="gradient-text animate-gradient">In Seconds.</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Stop staring at a blank screen. ScriptGo uses advanced AI to generate platform-optimized scripts for LinkedIn, YouTube, and TikTok that actually convert.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/login?tab=signup"
                  className="h-14 px-8 rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-xl hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Start Writing for Free
                  <Zap className="h-5 w-5 fill-current" />
                </Link>
                <div className="flex items-center gap-4 px-6 h-14 rounded-2xl border border-border glass hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900" />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">10k+ layouts</span>
                    <span className="text-[10px] text-muted-foreground">Generated this week</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-muted-foreground/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Free tier available
                </div>
              </div>
            </div>

            {/* Right Visual - 3D/Glass Mockup */}
            <div className={`relative ${mounted ? 'animate-in slide-in-from-bottom-4 duration-1000 delay-200' : 'opacity-0'}`}>
              <div className="relative z-10 rounded-3xl border border-white/10 glass-card p-4 shadow-2xl backdrop-blur-xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Window Controls */}
                <div className="h-8 flex items-center gap-2 px-4 border-b border-white/5 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>

                {/* Mock UI Content */}
                <div className="grid grid-cols-[240px_1fr] gap-6 h-[400px]">
                  {/* Sidebar */}
                  <div className="rounded-xl bg-muted/30 p-4 space-y-4 border border-white/5">
                    <div className="space-y-2">
                      <div className="h-2 w-12 bg-muted-foreground/20 rounded"></div>
                      <div className="h-10 w-full bg-primary/20 rounded-lg border border-primary/30 flex items-center px-3 gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <div className="h-2 w-16 bg-primary/40 rounded"></div>
                      </div>
                      <div className="h-10 w-full hover:bg-white/5 rounded-lg flex items-center px-3 gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="h-2 w-20 bg-muted-foreground/20 rounded"></div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <div className="h-2 w-8 bg-muted-foreground/20 rounded mb-4"></div>
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col gap-2 p-3 rounded-lg bg-background/40 border border-white/5">
                          <div className="h-2 w-full bg-muted-foreground/10 rounded"></div>
                          <div className="h-2 w-2/3 bg-muted-foreground/10 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Area */}
                  <div className="flex flex-col gap-4">
                    <div className="h-32 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/10 p-6 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-6 w-10 bg-primary/20 rounded-md flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">AI</span>
                        </div>
                        <div className="h-4 w-3/4 bg-primary/10 rounded"></div>
                      </div>
                      <div className="h-2 w-1/2 bg-primary/5 rounded"></div>
                    </div>

                    <div className="flex-1 rounded-xl bg-background/50 border border-white/5 p-6 font-mono text-xs text-muted-foreground leading-relaxed">
                      <span className="text-blue-400">Title:</span> How to scale your SaaS in 2024<br /><br />
                      <span className="text-purple-400">Hook:</span> Most founders fail because they focus on the wrong metrics.<br /><br />
                      <span className="text-green-400">Body:</span> It's not about traffic. It's about retention. Here are 3 ways to fix your churn...<br />
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating element behind */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full rounded-3xl bg-gradient-to-br from-primary to-blue-600 opacity-20 blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section id="about" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-outfit text-4xl md:text-5xl font-bold">Everything needed to <br />dominate your niche</h2>
            <p className="text-muted-foreground text-lg">Powerful tools packed into one beautiful dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">

            {/* Feature 1: Large Left */}
            <div className="md:col-span-2 row-span-2 rounded-3xl border border-white/10 bg-card/30 backdrop-blur-sm p-8 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-outfit">Multi-Model AI Generation</h3>
                <p className="text-muted-foreground hover:text-foreground transition-colors">
                  Switch between tailored models for LinkedIn engagement, YouTube retention, and TikTok virality. Our AI understands the nuance of each platform's algorithm.
                </p>
              </div>

              <div className="relative h-[300px] w-full bg-[#1A1A1A] rounded-xl border border-white/5 p-6 font-mono text-sm overflow-hidden flex flex-col justify-center">
                {/* Editor UI matching the mockup */}
                <div className="space-y-6 relative z-10 opacity-90">
                  <div>
                    <span className="text-blue-400 font-bold">Title:</span>
                    <span className="text-gray-300 ml-2">How to scale your SaaS in 2024</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-bold">Hook:</span>
                    <span className="text-gray-400 ml-2">Most founders fail because they focus on the wrong metrics.</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-bold">Body:</span>
                    <span className="text-gray-400 ml-2">It's not about traffic. It's about retention. Here are 3 ways to fix your churn...</span>
                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle"></span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Feature 2: Top Right */}
            <div className="rounded-3xl border border-white/10 bg-card/30 backdrop-blur-sm p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
              <div className="absolute -right-10 -top-10 h-32 w-32 bg-purple-500/20 blur-[50px] rounded-full group-hover:bg-purple-500/30 transition-colors"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded">New</span>
                </div>
                <h3 className="text-xl font-bold font-outfit mb-2">Content Calendar</h3>
                <p className="text-sm text-muted-foreground">Plan 30 days of content in one click. Maintain consistency effortlessly.</p>
              </div>
              {/* Mini Calendar visual */}
              <div className="mt-6 grid grid-cols-7 gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className={`aspect-square rounded-sm ${i % 2 === 0 ? 'bg-purple-500/40' : 'bg-white/5'}`}></div>
                ))}
              </div>
            </div>

            {/* Feature 3: Bottom Right */}
            <div className="rounded-3xl border border-white/10 bg-card/30 backdrop-blur-sm p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-blue-500/20 blur-[50px] rounded-full group-hover:bg-blue-500/30 transition-colors"></div>
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Globe2 className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold font-outfit mb-2">Multi-Lingual</h3>
                <p className="text-sm text-muted-foreground">Generate in 25+ languages with native-level fluency and cultural nuance.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/5">English</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/5">Spanish</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/5">French</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/5">Tamil</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] border border-white/5">Hindi</span>
              </div>
            </div>

          </div>
        </section>

        {/* SOCIAL PROOF - MARQUEE */}
        <section className="py-20 bg-muted/20 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trusted by next-gen creators</p>
          </div>

          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee flex gap-8 items-center whitespace-nowrap py-4 shrink-0">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                <div key={idx} className="w-64 h-32 rounded-xl bg-card border border-border p-5 flex flex-col justify-between hover:border-primary/40 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600"></div>
                    <div>
                      <p className="text-sm font-bold">Alex G.</p>
                      <p className="text-[10px] text-muted-foreground">@alxg_creator</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic whitespace-normal">"ScriptGo saved me 20 hours a week on writing. It's a no-brainer."</p>
                </div>
              ))}
            </div>

            <div className="animate-marquee flex gap-8 items-center whitespace-nowrap py-4 shrink-0" aria-hidden="true">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                <div key={`dup-${idx}`} className="w-64 h-32 rounded-xl bg-card border border-border p-5 flex flex-col justify-between hover:border-primary/40 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600"></div>
                    <div>
                      <p className="text-sm font-bold">Alex G.</p>
                      <p className="text-[10px] text-muted-foreground">@alxg_creator</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic whitespace-normal">"ScriptGo saved me 20 hours a week on writing. It's a no-brainer."</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-[100px] opacity-20 rounded-full"></div>

            <div className="relative z-10 glass-card rounded-[2.5rem] p-12 md:p-20 text-center border border-white/10 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              <div className="relative z-10 space-y-8">
                <h2 className="font-outfit text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                  Ready to go <br />
                  <span className="text-primary">Viral?</span>
                </h2>
                <p className="text-xl text-gray-800 max-w-xl mx-auto">
                  Join 5,000+ creators who are scaling their content output with ScriptGo today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/login?tab=signup"
                    className="h-14 px-10 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:scale-105"
                  >
                    Get Started for Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 sm:mt-0">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/20 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-outfit font-bold text-xl">ScriptGo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-powered content generation for the modern creator economy.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">About</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Changelog</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Privacy</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Terms</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>© 2026 ScriptGo Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <span>Twitter</span>
                <span>LinkedIn</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div >
  )
}
