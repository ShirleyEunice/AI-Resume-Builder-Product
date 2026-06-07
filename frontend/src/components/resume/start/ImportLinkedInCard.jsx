import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { importResume } from "@/services/resumeService";
import { setResume } from "@/redux/slices/resumeSlice";

const ImportLinkedInCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const parsed = await importResume(file, "linkedin");
      dispatch(setResume(parsed));
      toast.success("LinkedIn profile imported - review and edit");
      navigate("/resume/templates");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Could not import LinkedIn PDF");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <label
      className="
        bg-white
        rounded-3xl
        border
        p-10
        text-center
        shadow-sm
        hover:shadow-xl
        transition
        hover:-translate-y-1
        cursor-pointer
        block
      "
    >
      <input
        type="file"
        accept=".pdf"
        hidden
        disabled={loading}
        onChange={handleUpload}
      />

      <div className="
        w-20
        h-20
        mx-auto
        rounded-2xl
        bg-blue-100
        flex
        items-center
        justify-center
      ">
        {loading ? (
          <Loader2 className="w-10 h-10 text-blue-700 animate-spin" />
        ) : (
          <LinkedInIcon className="w-10 h-10 text-blue-700" />
        )}
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {loading ? "Importing your profile" : "Import LinkedIn"}
      </h2>

      <p className="mt-3 text-gray-500">
        On your profile, click <span className="font-medium">More &rarr; Save to PDF</span>, then upload it here.
      </p>
    </label>
  );
};

export default ImportLinkedInCard;
