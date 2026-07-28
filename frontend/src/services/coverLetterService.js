import API from "@/api/axios";

// Generate cover letter
export const generateCoverLetter = async ({resumeId, resumeText, jdText, tone, title})=>{
    const response = await API.post("/cover-letter/generate", {
        resumeId,
        resumeText,
        jdText,
        tone,
        title
    });
    return response.data;
}

//get list of cover letter
export const getCoverLetterHistory = async ()=>{
    const response = await API.get("/cover-letter/history");
    return response.data;
}

// Get Cover Letter by ID
export const getCoverLetterById = async (id)=>{
    const response = await API.get(`/cover-letter/${id}`);
    return response.data;
}

//Delete cover letter
export const deleteCoverLetter = async (id)=>{
    const response = await API.delete(`/cover-letter/${id}`);
    return response.data;
}

//Parse an uploaded resume PDF into raw text
export const parseResume = async (file)=>{
    const formData = new FormData();
    formData.append("file", file);
    const response = await API.post("/cover-letter/parse-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // { resumeText }
}