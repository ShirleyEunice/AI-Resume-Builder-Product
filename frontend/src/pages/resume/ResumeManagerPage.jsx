import ResumeManagerHeader from '@/components/resume/manager/ResumeManagerHeader'
import ResumeManagerTable from '@/components/resume/manager/ResumeManagerTable'
import ResumeManagerToolbar from '@/components/resume/manager/ResumeManagerToolbar'
import ResumePagination from '@/components/resume/manager/ResumePagination'
import { setManagerError, setManagerLoading, setManagerPage, setManagerResumes, setManagerSearch, setManagerSort } from '@/redux/slices/resumeManagerSlice'
import { getResumes } from '@/services/resumeService'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ResumeManagerPage = () => {
  const dispatch = useDispatch();
  const {page, limit, sort, order, search, total, totalPages} = useSelector((state)=> state.resumeManager);

  const fetchResumes = useCallback(async ()=>{
    try {
      dispatch(setManagerLoading(true));
      const data = await getResumes({page, limit, sort, order, search});
      dispatch(setManagerResumes(data));
    } catch (error) {
      dispatch(setManagerError("Failed to load resumes"));
    }finally{
      dispatch(setManagerLoading(false));
    }
  }, [page, limit, sort, order, search, dispatch]);

  useEffect(()=>{
    fetchResumes();
  }, [fetchResumes]);

  return (
    <div className='h-full overflow-y-auto bg-gray-100 p-6'>
      <ResumeManagerHeader total={total}/>
      <ResumeManagerToolbar 
      search = {search}
      onSearchChange={(val)=> dispatch(setManagerSearch(val))}
      sort={sort}
      onSortChange={(val)=> dispatch(setManagerSort(val))}
      order={order}
      />
      <ResumeManagerTable />
      <ResumePagination
      page={page}
      totalPages={totalPages}
      onPageChange = {(p)=> dispatch(setManagerPage(p))} />
    </div>
  )
}

export default ResumeManagerPage