import React from 'react'
import { FileText, Target, MessageSquare, Sparkles, Check } from 'lucide-react'
import Logo from '@/components/Logo'

const features = [
  { icon: FileText, text: 'AI resume builder with ATS-smart suggestions' },
  { icon: Target, text: 'Beat applicant tracking systems before you apply' },
  { icon: MessageSquare, text: 'Tailored cover letters & interview coaching' },
]

const stats = [
  { value: '50K+', label: 'Resumes forged' },
  { value: '85%', label: 'ATS pass rate' },
  { value: '10K+', label: 'Jobs landed' },
]

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-brand-cloud">

      {/* Left — brand panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden text-white"
        style={{ background: 'radial-gradient(130% 130% at 0% 0%, #123449 0%, #0B1220 58%)' }}
      >
        {/* Atmosphere: dot grid, teal + sand glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1.2px, transparent 1.2px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(20,184,166,0.22)' }} />
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(45,212,191,0.14)' }} />
          <div className="absolute -bottom-28 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(245,201,123,0.10)' }} />
        </div>

        {/* Top — logo + hero */}
        <div className="relative z-10 animate-cf-fade-up">
          <Logo textClassName="text-white" size={38} />

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-brand-aqua mt-14 mb-7 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-sand" />
            Powered by advanced AI
          </div>

          <h1 className="font-display font-semibold text-[3rem] leading-[1.04] tracking-tight mb-5">
            Forge your next
            <br />
            <span className="text-brand-aqua">opportunity</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed max-w-sm mb-10">
            Build winning resumes, craft tailored cover letters, and crush ATS filters — all in one AI-powered workspace.
          </p>

          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-brand-primary/25"
                  style={{ background: 'rgba(20,184,166,0.14)' }}
                >
                  <Icon className="w-4 h-4 text-brand-aqua" />
                </div>
                <span className="text-slate-200 text-sm leading-relaxed pt-1.5">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — stats */}
        <div className="relative z-10 animate-cf-fade-up" style={{ animationDelay: '0.12s' }}>
          <div
            className="grid grid-cols-3 gap-4 p-5 rounded-2xl border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}
          >
            {stats.map(({ value, label }, i) => (
              <div key={label} className={`text-center ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}>
                <div className="font-display font-semibold text-2xl text-brand-sand">{value}</div>
                <div className="text-[11px] text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-4 flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-brand-primary" />
            Trusted by job seekers worldwide
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-5 sm:p-10 bg-brand-cloud min-h-screen">
        <div className="w-full max-w-md animate-cf-fade-up">
          {/* Mobile-only logo */}
          <div className="mb-8 lg:hidden">
            <Logo textClassName="text-brand-ink" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
