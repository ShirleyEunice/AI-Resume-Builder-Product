import React from 'react'

const PreviewProject = ({projects}) => {
  return (
<div className="mt-10">

  <h2 className="text-xl font-semibold border-b pb-2 mb-4">
    Projects
  </h2>

  {projects?.map((project, index) => (
    <div key={index} className="mb-6">

      <div className="flex justify-between items-center">

        <h3 className="font-bold text-lg">
          {project.title}
        </h3>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="text-blue-600 text-sm"
          >
            View Project
          </a>
        )}

      </div>

      {/* TECH STACK */}
      <div className="flex flex-wrap gap-2 mt-3">

        {project.techStack
          ?.split(",")
          .map((tech, i) => (
            <span
              key={i}
              className="
                px-3 py-1
                bg-blue-100
                text-blue-700
                rounded-full
                text-xs
                font-medium
              "
            >
              {tech.trim()}
            </span>
          ))}

      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-700 leading-7">
        {project.description}
      </p>

    </div>
  ))}

</div>
  )
}

export default PreviewProject