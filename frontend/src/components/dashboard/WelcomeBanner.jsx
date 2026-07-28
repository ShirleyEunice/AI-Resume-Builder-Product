import React from 'react'
import { useSelector } from 'react-redux'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const WelcomeBanner = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-7 md:px-10 md:py-9 text-white shadow-brand animate-cf-fade-up"
      style={{ background: 'radial-gradient(120% 140% at 0% 0%, #123449 0%, #0B1220 55%)' }}
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-16 right-10 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'rgba(20,184,166,0.25)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-brand-aqua border border-white/10 mb-4"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-sand" /> {greeting()}
        </div>

        <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight font-semibold">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="mt-2 text-slate-300 text-sm max-w-md">
          Pick up your AI-powered career journey — build, analyze, and apply with confidence.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/resume/start"
            className="bg-brand-primary hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-brand transition"
          >
            Build a resume
          </Link>
          <Link
            to="/ats"
            className="bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Analyze ATS
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
