import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../features/resumeSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const MyResumes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {resumes, loading} = useSelector((state)=> state.resume);

    useEffect(()=>{
        dispatch(fetchResumes());
    }, []);
  return (
    <div>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">My Resumes</h1>

    <Button onClick={() => navigate("/create")}>
      + Create Resume
    </Button>
  </div>
  {loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="h-32 w-full rounded-xl" />
    ))}
  </div>
) : (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {resumes.map((resume) => (
      <Card key={resume._id} className="hover:shadow-lg transition">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">{resume.title}</h2>
          <p className="text-sm text-gray-500">
            {resume.personalInfo?.name}
          </p>

          <div className="flex justify-between items-center mt-4">
            {/* <span className="text-green-500 text-sm">
              ATS: 70%
            </span> */}

            {/* <Button variant="outline" size="sm">
              Edit
            </Button> */}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)}
</div>
  )
}

export default MyResumes