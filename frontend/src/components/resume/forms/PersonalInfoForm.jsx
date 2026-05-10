import { Hand } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateResume } from '@/redux/slices/resumeSlice';
import API from '@/api/axios';
import { section, summary } from 'framer-motion/client';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const {currentResume} = useSelector((state)=> state.resume);
  const [loading, setLoading] = useState(false);

  const skills = [
  ...(currentResume.skills?.technical || []),
  ...(currentResume.skills?.tools || []),
].join(", ");

  const handleChange = (e)=>{
    dispatch(
      updateResume({
        section: "personalInfo",
        data:{
          ...personalInfo,
          [e.target.name]: e.target.value,
        }
      })
    )
  }

  const generateAISummary = async ()=>{
    try {
      setLoading(true);

      const res = await API.post("/agent/generate-summary", {
        role: personalInfo.headLine,
        skills: skills,
        experienceLevel: personalInfo.yearsOfExperience
      });

      dispatch(
        updateResume({
          section: "personalInfo",
          data:{
            ...personalInfo,
            summary: res.data.summary,
          }
        })
      )
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  const personalInfo = currentResume?.personalInfo || {};
  return (
  <div className="space-y-8 pb-10">

    {/* HEADER */}
    <div>

      <h1 className="text-3xl font-bold">
        Personal Information
      </h1>

      <p className="text-gray-500 mt-1">
        Add your personal and professional details
      </p>

    </div>

    {/* CONTACT INFO */}
    <div className="
      bg-white
      rounded-2xl
      border
      shadow-sm
      p-6
      space-y-5
    ">

      <div>

        <h2 className="text-xl font-semibold">
          Contact Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Basic contact details for your resume
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={personalInfo.fullName || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={personalInfo.email || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={personalInfo.phone || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={personalInfo.location || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

      </div>

    </div>

    {/* PROFESSIONAL DETAILS */}
    <div className="
      bg-white
      rounded-2xl
      border
      shadow-sm
      p-6
      space-y-5
    ">

      <div>

        <h2 className="text-xl font-semibold">
          Professional Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add your professional identity
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="headLine"
          placeholder="Headline (e.g. Frontend Developer)"
          value={personalInfo.headLine || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="yearsOfExperience"
          placeholder="Years of Experience"
          value={personalInfo.yearsOfExperience || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={personalInfo.linkedin || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub"
          value={personalInfo.github || ""}
          onChange={handleChange}
          className="w-full rounded-xl p-3 border"
        />

      </div>

      <input
        type="text"
        name="portfolio"
        placeholder="Portfolio"
        value={personalInfo.portfolio || ""}
        onChange={handleChange}
        className="w-full rounded-xl p-3 border"
      />

    </div>

    {/* AI SUMMARY */}
    <div className="
      bg-white
      rounded-2xl
      border
      shadow-sm
      p-6
      space-y-5
    ">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Professional Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Generate ATS-friendly AI summary
          </p>

        </div>

        <button
          onClick={generateAISummary}
          disabled={loading}
          className="
            bg-violet-600
            hover:bg-violet-700
            text-white
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            transition
          "
        >
          {
            loading
              ? "Generating..."
              : "✨ Generate with AI"
          }
        </button>

      </div>

      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={personalInfo.summary || ""}
        onChange={handleChange}
        className="
          w-full
          rounded-xl
          p-4
          border
          h-40
          resize-none
        "
      />

    </div>

  </div>
)
}

export default PersonalInfoForm