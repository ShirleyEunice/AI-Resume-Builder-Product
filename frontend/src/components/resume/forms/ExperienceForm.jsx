import { useDispatch, useSelector } from "react-redux";
import { updateExperience } from "@/redux/slices/resumeSlice";

import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = () => {
  const dispatch = useDispatch();

  const experiences =
    useSelector(
      (state) => state.resume.currentResume.experience
    ) || [];

  // ADD EXPERIENCE
  const addExperience = () => {
    dispatch(
      updateExperience([
        ...experiences,
        {
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          description: [""],
        },
      ])
    );
  };

  // REMOVE EXPERIENCE
  const removeExperience = (index) => {
    const updated = experiences.filter(
      (_, i) => i !== index
    );

    dispatch(updateExperience(updated));
  };

  // UPDATE FIELD
  const handleChange = (
  index,
  field,
  value
) => {
  const updated = JSON.parse(
    JSON.stringify(experiences)
  );

  updated[index][field] = value;

  dispatch(updateExperience(updated));
};

  // UPDATE BULLET
  const handleBulletChange = (
  expIndex,
  bulletIndex,
  value
) => {
  const updated = JSON.parse(
    JSON.stringify(experiences)
  );

  updated[expIndex].description[
    bulletIndex
  ] = value;

  dispatch(updateExperience(updated));
};

  // ADD BULLET
  const addBullet = (index) => {
  const updated = JSON.parse(
    JSON.stringify(experiences)
  );

  updated[index].description.push("");

  dispatch(updateExperience(updated));
};

  return (
    <div className="space-y-6">

      {/* TOP HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Experience
          </h1>

          <p className="text-gray-500 mt-1">
            Add your professional experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="
            flex items-center gap-2
            bg-blue-600 text-white
            px-4 py-2 rounded-xl
          "
        >
          <Plus size={18} />
          Add Experience
        </button>

      </div>

      {/* EXPERIENCE LIST */}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="
            bg-white dark:bg-gray-900
            border
            rounded-2xl
            p-6
            shadow-sm
            space-y-5
          "
        >

          {/* CARD TOP */}
          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-xl font-semibold">
                Experience {index + 1}
              </h2>

              <p className="text-sm text-gray-500">
                Add your role details
              </p>

            </div>

            <button
              onClick={() =>
                removeExperience(index)
              }
              className="
                text-red-500
                hover:bg-red-50
                p-2 rounded-lg
              "
            >
              <Trash2 size={18} />
            </button>

          </div>

          {/* ROLE + COMPANY */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="text-sm font-medium">
                Role
              </label>

              <input
                placeholder="Frontend Developer"
                value={exp.role}
                onChange={(e) =>
                  handleChange(
                    index,
                    "role",
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-3 rounded-xl mt-1
                "
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Company
              </label>

              <input
                placeholder="Google"
                value={exp.company}
                onChange={(e) =>
                  handleChange(
                    index,
                    "company",
                    e.target.value
                  )
                }
                className="
                  w-full border
                  p-3 rounded-xl mt-1
                "
              />

            </div>

          </div>

          {/* DATES */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) =>
                handleChange(
                  index,
                  "startDate",
                  e.target.value
                )
              }
              className="
                border
                p-3 rounded-xl
              "
            />

            {
              !exp.current && (
                <input
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "endDate",
                      e.target.value
                    )
                  }
                  className="
                    border
                    p-3 rounded-xl
                  "
                />
              )
            }

          </div>

          {/* CURRENT JOB */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={exp.current || false}
              onChange={(e) =>
                handleChange(
                  index,
                  "current",
                  e.target.checked
                )
              }
            />

            <label className="text-sm font-medium">
              I currently work here
            </label>

          </div>

          {/* BULLETS */}
          <div className="space-y-3">

            <h3 className="font-medium">
              Responsibilities
            </h3>

            {
              exp.description.map(
                (bullet, bulletIndex) => (
                  <textarea
                    key={bulletIndex}
                    value={bullet}
                    onChange={(e) =>
                      handleBulletChange(
                        index,
                        bulletIndex,
                        e.target.value
                      )
                    }
                    placeholder="
Built responsive dashboards improving performance by 30%
                    "
                    className="
                      w-full border
                      p-4 rounded-xl
                      h-24 resize-none
                    "
                  />
                )
              )
            }

            {/* ADD BULLET */}
            <button
              onClick={() =>
                addBullet(index)
              }
              className="
                text-blue-600
                text-sm font-medium
              "
            >
              + Add Bullet Point
            </button>

            {/* AI BUTTON */}
            <button
              className="
                text-sm
                text-violet-600
                font-medium
                hover:underline
                block
              "
            >
              ✨ Enhance with AI
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default ExperienceForm;