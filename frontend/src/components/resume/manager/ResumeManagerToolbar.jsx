import { Search } from 'lucide-react'
import React from 'react'

const SORT_OPTIONS = [
  {label: "Last Modified", value: "updatedAt"},
  {label: "Date Created", value: "createdAt"},
  {label: "Title", value: "title"},
  {label: "ATS Score", value: "atsScore"},
]

const ResumeManagerToolbar = ({search, onSearchChange, sort, order, onSortChange}) => {

  const currentValue = `${sort}:${order}`;

  const handleSortChange = (e)=>{
    const [newSort, newOrder] = e.target.value.split(":");
    onSortChange({sort:newSort, order:newOrder});
  }
  return (
    <div className='flex items-center gap-3 mb-4'>
      {/* Search */}
      <div className='relative flex-1 max-w-sm'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'/>
        <input
        type='text'
        placeholder='Search resumes...'
        value={search}
        onChange={(e)=> onSearchChange(e.target.value)}
        className='w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500'/>
      </div>

      {/* Sort */}
      <select
      value={currentValue}
      onChange={handleSortChange}
      className='px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white'>
        {
          SORT_OPTIONS.map((opt)=>(
            <option key={`${opt.value}:desc`}
            value={`${opt.value}:desc`}>
              {opt.label} (Newest)
            </option>
          ))
        }
        {SORT_OPTIONS.map((opt) => (
            <option key={`${opt.value}:asc`} value={`${opt.value}:asc`}>
              {opt.label} (Oldest)
            </option>
          ))}
      </select>
    </div>
  )
}

export default ResumeManagerToolbar