'use client'

import Link from 'next/link'
import { Rocket, ArrowRight, Zap, Target, TrendingUp, Sparkles, CheckCircle2, Play, Users, Award, BarChart3, Globe } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 font-inter overflow-x-hidden">

      {/* MODERN NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all group-hover:scale-105 group-hover:shadow-emerald-500/40">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-slate-900">ScriptGo</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/login?tab=signup"
              className="h-11 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-sm font-semibold text-white flex items-center justify-center hover:shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100 via-teal-50 to-transparent rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-40"></div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-emerald-700">AI-Powered Content Generation</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
                  Create viral scripts in{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    seconds
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  Generate data-driven content for LinkedIn, YouTube, and TikTok using advanced AI frameworks. Join 5,000+ creators scaling their influence.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/login?tab=signup"
                    className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-emerald-500/30 transition-all group"
                  >
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="h-14 px-8 bg-white border-2 border-slate-200 rounded-xl text-base font-semibold text-slate-700 flex items-center justify-center gap-2 hover:border-slate-300 hover:bg-slate-50 transition-all group">
                    <Play className="h-5 w-5 text-emerald-600" />
                    Watch Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white"></div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">5,000+ creators</div>
                    <div className="text-slate-600">already using ScriptGo</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Visual */}
              <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/60 bg-white p-8">
                  {/* Mockup Content */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">AI Script Generator</div>
                        <div className="text-xs text-slate-500">Powered by GPT-4</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-100 rounded-full w-full"></div>
                      <div className="h-3 bg-slate-100 rounded-full w-5/6"></div>
                      <div className="h-3 bg-slate-100 rounded-full w-4/6"></div>
                      <div className="h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-emerald-600 animate-pulse" />
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full w-full"></div>
                      <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl shadow-xl flex items-center justify-center animate-float delay-200">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & SOCIAL PROOF */}
        <section className="py-12 px-6 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm font-medium text-slate-500 mb-8">Trusted by leading creators and brands</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              {[Users, Award, BarChart3, Globe, Sparkles, Target].map((Icon, i) => (
                <Icon key={i} className="h-8 w-8 text-slate-400" />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Everything you need to{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  go viral
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Powerful features designed to help you create high-performing content faster than ever before.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Generation',
                  description: 'Generate production-ready scripts in seconds using advanced GPT-4 technology.',
                  color: 'from-emerald-500 to-teal-600'
                },
                {
                  icon: Target,
                  title: 'Data-Driven Insights',
                  description: 'Every script is optimized using proven frameworks like AIDA, PAS, and Hook-Story-CTA.',
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  icon: TrendingUp,
                  title: 'Platform Optimization',
                  description: 'Content tailored specifically for LinkedIn, YouTube, TikTok, and more.',
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  icon: Sparkles,
                  title: 'Multi-Language Support',
                  description: 'Create content in English, Tamil, Hindi, Spanish, and more languages.',
                  color: 'from-orange-500 to-red-600'
                },
                {
                  icon: CheckCircle2,
                  title: 'Instant Export',
                  description: 'Copy, download, or share your scripts with a single click.',
                  color: 'from-green-500 to-emerald-600'
                },
                {
                  icon: BarChart3,
                  title: 'Performance Tracking',
                  description: 'Save and organize all your scripts in one centralized dashboard.',
                  color: 'from-indigo-500 to-blue-600'
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT SHOWCASE */}
        <section id="how-it-works" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Visual */}
              <div className="relative order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-4 bg-white rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Generate Script</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-100 rounded w-full"></div>
                        <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                        <div className="h-2 bg-slate-100 rounded w-3/5"></div>
                      </div>
                      <div className="h-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-2 border-dashed border-emerald-300 flex items-center justify-center">
                        <Zap className="h-10 w-10 text-emerald-600 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  Simple, powerful, and{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    lightning fast
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  ScriptGo eliminates the guesswork from content creation. Our AI analyzes top-performing content and generates scripts proven to drive engagement.
                </p>

                <div className="space-y-4 pt-4">
                  {[
                    'Choose your platform and content type',
                    'Select a proven marketing framework',
                    'Generate and customize your script',
                    'Export and publish in seconds'
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS / VALUE SECTION */}
        <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Why creators choose{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ScriptGo
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Stop wasting hours on content creation. Start publishing high-quality scripts that convert.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  stat: '10x',
                  label: 'Faster Content Creation',
                  description: 'Generate scripts in seconds instead of hours'
                },
                {
                  stat: '5,000+',
                  label: 'Active Creators',
                  description: 'Join thousands of successful content creators'
                },
                {
                  stat: '99.9%',
                  label: 'Satisfaction Rate',
                  description: 'Loved by creators across all platforms'
                }
              ].map((item, i) => (
                <div key={i} className="text-center p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {item.stat}
                  </div>
                  <div className="text-lg font-semibold text-slate-900 mb-2">{item.label}</div>
                  <div className="text-sm text-slate-600">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="pricing" className="py-24 px-6 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Start creating viral content today
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of creators who are already scaling their influence with AI-powered scripts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/login?tab=signup"
                className="h-16 px-10 bg-white text-emerald-600 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-105 transition-all group"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="h-16 px-10 bg-white/10 backdrop-blur border-2 border-white/30 text-white rounded-xl text-lg font-bold flex items-center justify-center hover:bg-white/20 transition-all"
              >
                Sign In
              </Link>
            </div>

            <p className="text-sm text-white/70 pt-4">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="font-outfit font-bold text-xl text-white">ScriptGo</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                AI-powered content generation for modern creators.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'FAQ', 'Roadmap']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Cookies']
              }
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2026 ScriptGo. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <Link key={social} href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
