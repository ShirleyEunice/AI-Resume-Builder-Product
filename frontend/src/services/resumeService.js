import API from "@/api/axios"

export const createResume = async (data)=>{
    const response = await API.post("/resume", data)
    return response.data
}

export const updateResumeById = async (id, data)=>{
    const response = await API.put(`/resume/${id}`, data);
    return response.data;
}

export const importResume = async (file, source = "resume")=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("source", source);
    const response = await API.post("/agent/import-resume", formData);
    return response.data;
}

export const getResumes = async ({page, limit, sort, order, search})=>{
    const params = new URLSearchParams({page,limit, sort, order, search});
    const response = await API.get(`/resume?${params}`);
    return response.data;
}

export const getResumeById = async (id) => {
    const response = await API.get(`/resume/${id}`);
    return response.data;
};

export const deleteResumeById = async (id)=>{
    const response = await API.delete(`/resume/${id}`);
    return response.data;
}