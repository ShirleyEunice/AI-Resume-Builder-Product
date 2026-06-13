import React from 'react'
import { FileText, Target, MessageSquare, Sparkles } from 'lucide-react'

const features = [
  { icon: FileText, text: 'AI-powered resume builder with smart suggestions' },
  { icon: Target, text: 'ATS optimizer to beat applicant tracking systems' },
  { icon: MessageSquare, text: 'Interview prep with real-time AI coaching' },
]

const stats = [
  { value: '50K+', label: 'Resumes Built' },
  { value: '85%', label: 'ATS Pass Rate' },
  { value: '10K+', label: 'Jobs Landed' },
]

const AuthLayout = ({ children }) => {
  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-white'>

      {/* Left Side */}
      <div className='hidden lg:flex flex-col justify-between p-12 relative overflow-hidden text-white'
        style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #0d9488 40%, #0F172A 100%)' }}>

        {/* Decorative background shapes */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-28 -right-28 w-96 h-96 rounded-full bg-white/5' />
          <div className='absolute top-1/3 -right-12 w-52 h-52 rounded-full bg-amber-400/10' />
          <div className='absolute -bottom-36 -left-36 w-80 h-80 rounded-full bg-white/5' />
          <div className='absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-teal-300/15' />
          {/* Dot grid */}
          <div className='absolute inset-0 opacity-[0.06]'
            style={{
              backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }} />
        </div>

        {/* Top — Logo & Hero */}
        <div className='relative z-10'>
          {/* Brand mark */}
          <div className='flex items-center gap-3 mb-14'>
            <div className='w-11 h-11 rounded-2xl flex items-center justify-center border border-white/20'
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
              <Sparkles className='w-5 h-5 text-amber-300' />
            </div>
            <span className='font-bold text-xl tracking-tight'>AI Career Platform</span>
          </div>

          {/* Pill badge */}
          <div className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-teal-100 mb-6 border border-white/10'
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <Sparkles className='w-3.5 h-3.5 text-amber-300' />
            Powered by Advanced AI
          </div>

          {/* Headline */}
          <h1 className='text-4xl font-bold leading-tight mb-4'>
            Land Your{' '}
            <span className='text-amber-300'>Dream Job</span>
            <br />Faster Than Ever
          </h1>
          <p className='text-teal-100 text-base leading-relaxed max-w-sm mb-10'>
            Build winning resumes, crush ATS filters, and ace your interviews — all with cutting-edge AI.
          </p>

          {/* Feature list */}
          <div className='space-y-4'>
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-400/20'
                  style={{ background: 'rgba(251,191,36,0.15)' }}>
                  <Icon className='w-4 h-4 text-amber-300' />
                </div>
                <span className='text-teal-50 text-sm leading-relaxed pt-1'>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Stats card */}
        <div className='relative z-10'>
          <div className='grid grid-cols-3 gap-4 p-5 rounded-2xl border border-white/10'
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`text-center ${i < stats.length - 1 ? 'border-r border-white/15' : ''}`}
              >
                <div className='text-2xl font-bold text-amber-300'>{value}</div>
                <div className='text-xs text-teal-200 mt-0.5'>{label}</div>
              </div>
            ))}
          </div>
          <p className='text-xs text-teal-300 text-center mt-4'>
            Trusted by job seekers worldwide
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex items-center justify-center p-8 bg-gray-50 min-h-screen'>
        <div className='w-full max-w-md'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
