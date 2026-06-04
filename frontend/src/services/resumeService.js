import API from "@/api/axios"

export const createResume = async (data)=>{
    const response = await API.post("/resume", data)
    return response.data
}

export const updateResumeById = async (id, data)=>{
    const response = await API.put(`/resume/${id}`, data);
    return response.data;
}