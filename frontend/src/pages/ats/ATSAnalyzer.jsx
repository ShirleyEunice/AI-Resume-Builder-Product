import AnalyzeButton from '@/components/ats/AnalyzeButton'
import ATSHero from '@/components/ats/ATSHero'
import ImproveResumeCTA from '@/components/ats/ImproveResumeCTA'
import JDInput from '@/components/ats/JDInput'
import ATSScoreCard from '@/components/ats/result_grid/ATSScoreCard'
import ImprovementSuggestions from '@/components/ats/result_grid/ImprovementSuggestions'
import MissingSkills from '@/components/ats/result_grid/MissingSkills'
import ResumeUploader from '@/components/ats/ResumeUploader'
import React from 'react'

const ATSAnalyzer = () => {
  return (
    <div
      className="
  h-full
  overflow-y-auto
  bg-gray-100
  p-5
"
    >
      <div
        className="
    space-y-5
    pb-10
  "
      >
        <ATSHero />

        <div
          className="
      grid
      lg:grid-cols-2
      gap-5 items-start
    "
        >
          <ResumeUploader />

          <JDInput />
        </div>

        <div className="
  sticky
  top-4
  z-20
  flex
  justify-center
">
  <AnalyzeButton />
</div>

        <div
          className="
      grid
      xl:grid-cols-3
      gap-5
    "
        >
          <ATSScoreCard />

          <MissingSkills />

          <ImprovementSuggestions />
        </div>

        <ImproveResumeCTA />
      </div>
    </div>
  );
}

export default ATSAnalyzer