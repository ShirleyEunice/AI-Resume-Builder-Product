import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

import { updateResume } from "@/redux/slices/resumeSlice";
import API from "@/api/axios";

import StepHeader from "./ui/StepHeader";
import Field from "./ui/Field";
import LinkList from "./ui/LinkList";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);
  const [loading, setLoading] = useState(false);

  const personalInfo = currentResume?.personalInfo || {};

  const skills = [
    ...(currentResume.skills?.technical || []),
    ...(currentResume.skills?.tools || []),
  ].join(", ");

  const setField = (name, value) => {
    dispatch(
      updateResume({
        section: "personalInfo",
        data: { ...personalInfo, [name]: value },
      }),
    );
  };

  const handleChange = (name) => (e) => setField(name, e.target.value);

  const generateAISummary = async () => {
    try {
      setLoading(true);

      const res = await API.post("/agent/generate-summary", {
        role: personalInfo.jobTitle,
        skills,
        experienceLevel: personalInfo.yearsOfExperience,
      });

      setField("summary", res.data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <StepHeader
        title="Let employers know who you are"
        subtitle="Include your full name and an email for employers to contact you"
      />

      <div className="space-y-5">
        <Field
          label="Name"
          value={personalInfo.fullName}
          onChange={handleChange("fullName")}
        />

        <Field
          label="Job Title"
          value={personalInfo.jobTitle}
          onChange={handleChange("jobTitle")}
        />

        <Field
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange("email")}
        />

        <Field
          label="Phone"
          value={personalInfo.phone}
          onChange={handleChange("phone")}
        />

        <Field
          label="LinkedIn"
          value={personalInfo.linkedin}
          onChange={handleChange("linkedin")}
          placeholder="linkedin.com/in/your-name"
        />

        <LinkList
          label="Website"
          items={personalInfo.websites || []}
          onChange={(next) => setField("websites", next)}
        />

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-semibold text-brand-dark">
              Summary
            </label>

            <button
              type="button"
              onClick={generateAISummary}
              disabled={loading}
              className="flex items-center gap-1 text-xs font-medium text-brand-primary
                hover:underline disabled:opacity-50"
            >
              <Sparkles size={13} />
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          <Field
            textarea
            rows={5}
            value={personalInfo.summary}
            onChange={handleChange("summary")}
          />
        </div>

        <Field
          label="Address"
          value={personalInfo.address}
          onChange={handleChange("address")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="City"
            value={personalInfo.city}
            onChange={handleChange("city")}
          />
          <Field
            label="State/Region"
            value={personalInfo.state}
            onChange={handleChange("state")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Postal Code"
            value={personalInfo.postalCode}
            onChange={handleChange("postalCode")}
          />
          <Field
            label="Country"
            value={personalInfo.country}
            onChange={handleChange("country")}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
