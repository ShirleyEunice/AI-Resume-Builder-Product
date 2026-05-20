import { ArrowRight, FileText, MessageSquare, Sparkles, Wand2 } from 'lucide-react';
import React, { act } from 'react'
import { Navigate } from 'react-router-dom';

const actions = [
  {
    title: "Create Resume",

    description: "Build a professional AI-powered resume",

    icon: FileText,

    path: "/resume-builder",
  },

  {
    title: "Analyze ATS",

    description: "Compare resume with job description",

    icon: Sparkles,

    path: "/resume-jd-compare",
  },

  {
    title: "Interview Prep",

    description: "Practice AI-powered mock interviews",

    icon: MessageSquare,

    path: "/interview-chat",
  },

  {
    title: "Cover Letter",

    description: "Generate tailored cover letters",

    icon: Wand2,

    path: "/cover-letter",
  },
];

const QuickActions = () => {
  return (
    <div className='bg-white rounded-3xl p-4 shadow-sm border'>
        <div className='flex items-center justify-between mb-3'>
            <div>
                <h2 className='text-xl font-bold'>Quick Actions</h2>
                <p className='text-gray-500 text-sm mt-1'>Jump into your AI workflows</p>
            </div>
        </div>

        {/* Action Grid */}
        <div className='grid md:grid-cols-2 gap-4'>
            {
                actions.map((action, index)=>{
                    const Icon = action.icon;
                    return (
                        <button key={index}
                        onClick={()=> Navigate(action.path)}
                        className='group border rounded-2xl p-4 min-h-[180px] text-left hover:border-violet-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between'>

                            {/*Icon */}
                            <div className='w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4'>
                                <Icon className='text-violet-600'/>
                            </div>

                            {/*Content */}
                            <h3 className='text-semibold text-lg'>{action.title}</h3>
                            <p className='text-sm text-gray-500 mt-2 leading-relaxed'>{action.description}</p>

                            {/*Arrow */}
                            <div className='flex justify-end mt-4'>
                                <ArrowRight className='w-5 h-5 text-gray-400 group-hover:text-violet-600 transition'/>
                            </div>
                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default QuickActions