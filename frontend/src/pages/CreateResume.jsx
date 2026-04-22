import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createResume } from '../features/resumeSlice';
import { fetchATSScore } from '../features/atsSlice';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CreateResume = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {atsScore} = useSelector((state)=> state.agent);

    const [form, setForm] = useState({
        title: "",
        name: "",
        email:"",

    });

    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(
          fetchATSScore({
            title: form.title,
            personalInfo: {
              name: form.name,
              email: form.email,
            },
          }),
        );
      }, 500);

      return () => clearTimeout(timer);
    }, [form, dispatch]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            title: form.title,
            personalInfo:{
                name: form.name,
                email: form.email,
            }
        };
         console.log("Sending data:", data);
         try {
          await dispatch(createResume(data)).unwrap();
        navigate("/");
         } catch (error) {
          alert(error.message || "Limit Reached");
         }
    }

  return (
    <Card className="max-w-xl mx-auto">
  <CardContent className="p-6">
    <h2 className="text-xl font-bold mb-4">Create Resume</h2>
    <div className="mb-4">
  <p className="text-sm text-gray-500">ATS Score</p>
  <div className="text-2xl font-bold">
    {atsScore}%
  </div>
</div>

    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        placeholder="Resume Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <Input
        placeholder="Full Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <Input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <Button className="w-full">
        Save Resume
      </Button>
    </form>
  </CardContent>
</Card>
  )
}

export default CreateResume