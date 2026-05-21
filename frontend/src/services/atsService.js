import API from "@/api/axios";

export const atsAnalyzer = async (resumeFile, jdText)=>{
    const formData = new FormData();

    formData.append("file", resumeFile);
    formData.append("jdText", jdText);

    const response = await API.post("/ats/analyze-ats", formData, {headers: {
        'Content-Type': 'multipart/form-data',
    }})
    return response.data;
}