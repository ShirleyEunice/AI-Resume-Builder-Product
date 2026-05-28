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

export const getATSHistory = async ()=>{
    const response = await API.get("/ats/history");
    return response.data;
}

export const deleteATSScan = async (id)=>{
    const response = await API.delete(`/ats/${id}`);
    return response.data;
}

export const getATSById = async(id)=>{
    const response = await API.get(`/ats/${id}`);
    return response.data;
}