import React from 'react'

const CreditUsage = () => {
    const credits = 120;

  const totalCredits = 200;

  const percentage =
    (credits / totalCredits) * 100;
  return (
    <div className='bg-white
      rounded-3xl
      p-6
      shadow-sm
      border'>
        <h2 className='text-xl font-bold'>Credit Usage</h2>
        <p className='text-xs text-gray-500 mt-1'>AI feature consumption</p>

        {/*credits */}
        <div className='mt-6'>
            <div className='flex justify-between text-xs mb-2'>
                <span>Remaining Credits</span>
                <span className='semi-bold'>{credits}/{totalCredits}</span>
            </div>

            {/*Progress Bar */}
            <div className='w-full h-3 rounded-full bg-gray-200 overflow-hidden'>
                <div style={{width: `${percentage}%`}}
                className='h-full bg-brand-primary rounded-full'>
                </div>
            </div>

            {/* Footer */}
            <div className='mt-6 bg-violet-50 border border-violet-100 rounded-2xl p-4'>
                <p className='text-xs text-brand-primary leading-relaxed'>
                    Upgrade to premium for
          unlimited AI generations
          and advanced interview coaching.</p>
            </div>
        </div>
      </div>
  )
}

export default CreditUsage