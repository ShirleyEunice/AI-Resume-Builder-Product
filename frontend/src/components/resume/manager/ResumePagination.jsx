import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const ResumePagination = ({page, totalPages, onPageChange}) => {
  if(totalPages <=1) return null;
  return (
    <div className='flex items-center justify-center gap-2 mt-6'>
      <button
      onClick={()=> onPageChange(page - 1)}
      disabled={page === 1}
      className='p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'>
        <ChevronLeft className='w-4 h-4' />
      </button>

      {Array.from({length: totalPages}, (_, i)=> i+1).map((p) => (
        <button
        key={p}
        onClick={()=> onPageChange(p)}
        className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
              p === page
                ? "bg-teal-600 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
              {p}
        </button>
      ))}

      <button
      onClick={()=> onPageChange(page + 1)}
      disabled={page === totalPages}
      className='p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'>
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  )
}

export default ResumePagination