import { div } from 'framer-motion/client';
import React from 'react'

const cards = [
  {
    title: "Resumes",
    value: "12",
  },

  {
    title: "ATS Analyses",
    value: "8",
  },

  {
    title: "Interview Sessions",
    value: "15",
  },

  {
    title: "Credits Left",
    value: "120",
  },
];
const StatsCard = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {cards.map((card, index)=>(
            <div key={index}
            className='bg-white rounded-2xl p-6 shadow-sm border'>
                <p className='text-gray-500 text-sm'>{card.title}</p>
                <h2 className='text-3xl font-bold mt-2'>{card.value}</h2>
            </div>
        ))}
    </div>
  )
}

export default StatsCard