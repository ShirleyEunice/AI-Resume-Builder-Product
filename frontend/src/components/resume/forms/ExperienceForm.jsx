import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Sparkles, X } from "lucide-react";

import { updateResume } from "@/redux/slices/resumeSlice";
import API from "@/api/axios";

import StepHeader from "./ui/StepHeader";
import Field from "./ui/Field";
import RepeatableSection from "./ui/RepeatableSection";

const NEW_EXPERIENCE = {
  jobTitle: "",
  employer: "",
  location: "",
  url: "",
  startDate: "",
  endDate: "",
  current: false,
  summary: "",
  highlights: [],
};

const FIELDS = [
  { name: "jobTitle", label: "Job Title", half: true },
  { name: "employer", label: "Employer", half: true },
  { name: "location", label: "Location", placeholder: "City, State, Country", half: true },
  { name: "url", label: "URL", half: true },
  { name: "startDate", label: "Start Date", placeholder: "MM YYYY", half: true },
  { name: "endDate", label: "End Date", placeholder: "MM YYYY", half: true },
];

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences =
    useSelector((state) => state.resume.currentResume.experience) || [];

  const [enhancingKey, setEnhancingKey] = useState(null);

  const save = (next) =>
    dispatch(updateResume({ section: "experience", data: next }));

  // Ensure the first entry is always visible, matching the design.
  const entries = experiences.length ? experiences : [{ ...NEW_EXPERIENCE }];

  const updateHighlights = (index, highlights) => {
    const next = entries.map((exp, i) =>
      i === index ? { ...exp, highlights } : exp,
    );
    save(next);
  };

  const enhanceHighlight = async (index, hIndex, value) => {
    try {
      setEnhancingKey(`${index}-${hIndex}`);

      const res = await API.post("/agent/enhance-bullet", {
        bullet: value,
        role: entries[index].jobTitle,
      });

      const cleaned = res.data.enhancedBullet
        .replace(/^[-•*]\s*/, "")
        .trim();

      const highlights = [...(entries[index].highlights || [])];
      highlights[hIndex] = cleaned;
      updateHighlights(index, highlights);
    } catch (error) {
      console.error(error);
    } finally {
      setEnhancingKey(null);
    }
  };

  const renderExtra = (entry, index, updateField) => {
    const highlights = entry.highlights || [];
    const wordCount = (entry.summary || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return (
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={entry.current || false}
            onChange={(e) => updateField("current", e.target.checked)}
            className="accent-brand-primary"
          />
          I currently work here
        </label>

        <Field
          label="Summary"
          textarea
          rows={4}
          value={entry.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          hint={`${wordCount} / 40`}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-dark">
            Highlights
          </label>

          <div className="space-y-3">
            {highlights.map((highlight, hIndex) => {
              const key = `${index}-${hIndex}`;

              return (
                <div key={hIndex} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <textarea
                      value={highlight}
                      onChange={(e) => {
                        const next = [...highlights];
                        next[hIndex] = e.target.value;
                        updateHighlights(index, next);
                      }}
                      rows={2}
                      placeholder="Built responsive dashboards improving performance by 30%"
                      className="w-full resize-none rounded-md border border-gray-300 px-3 py-2
                        text-sm text-brand-dark placeholder-gray-400 outline-none transition
                        focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateHighlights(
                          index,
                          highlights.filter((_, i) => i !== hIndex),
                        )
                      }
                      className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => enhanceHighlight(index, hIndex, highlight)}
                    disabled={enhancingKey === key}
                    className="flex items-center gap-1 text-xs font-medium text-brand-primary
                      hover:underline disabled:opacity-50"
                  >
                    <Sparkles size={12} />
                    {enhancingKey === key ? "Enhancing..." : "Enhance with AI"}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => updateHighlights(index, [...highlights, ""])}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
          >
            <Plus size={16} />
            Add Highlights
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl">
      <StepHeader
        title="Tell us where you worked"
        subtitle="Let hiring managers know where you worked and what you accomplished"
      />

      <p className="-mt-5 mb-6 text-xs text-gray-400">
        Promotions within the company should be entered separately.
      </p>

      <RepeatableSection
        entries={entries}
        onChange={save}
        newEntry={NEW_EXPERIENCE}
        fields={FIELDS}
        entryLabel="Experience"
        addLabel="Add another experience"
        renderExtra={renderExtra}
      />
    </div>
  );
};

export default ExperienceForm;
