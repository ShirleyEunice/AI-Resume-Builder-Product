import ATSHistoryHeader from '@/components/ats/history/ATSHistoryHeader'
import ATSHistoryTable from '@/components/ats/history/ATSHistoryTable'
import ATSHistoryToolbar from '@/components/ats/history/ATSHistoryToolbar'
import { setATSHistory, setHistoryLoading } from '@/redux/slices/atsSlice'
import { getATSHistory } from '@/services/atsService'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const ATSHistory = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const fetchATSHistory = async ()=>{
    try {
      dispatch(setHistoryLoading(true));
      const data = await getATSHistory();
      dispatch(setATSHistory(data));
    } catch (error) {
      console.error(error);
    }
    finally{
      dispatch(setHistoryLoading(false));
    }
  }

  useEffect(()=>{
    fetchATSHistory();
  }, []);
  return (
    <div className='h-full overflow-y-auto bg-gray-100 p-6'>
      <ATSHistoryHeader/>
      <ATSHistoryToolbar
      search={search}
      setSearch={setSearch}
      sortBy={sortBy}
      setSortBy={setSortBy}/>
      <ATSHistoryTable
      search={search}
      sortBy={sortBy}
      setSortBy={setSortBy}/>
    </div>
  )
}

export default ATSHistory