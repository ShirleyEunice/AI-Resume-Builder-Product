import { useState } from "react";
import API from "../api/axios";

export default function CoverLetter() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await API.post("/agent/cover-letter", {
      resumeText,
      jdText,
      tone,
    });

    setResult(res.data.coverLetter);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        Cover Letter Generator
      </h1>

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Resume Text"
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Job Description"
        onChange={(e) => setJdText(e.target.value)}
      />

      <select
        className="border p-2 mb-3"
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="professional">Professional</option>
        <option value="casual">Casual</option>
        <option value="enthusiastic">Enthusiastic</option>
      </select>

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-3 py-1"
      >
        Generate
      </button>

      {result && (
        <div className="mt-4 whitespace-pre-line border p-3">
          {result}
        </div>
      )}
    </div>
  );
}