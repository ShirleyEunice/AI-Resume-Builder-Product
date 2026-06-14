import API from "@/api/axios";

export const sendResumeEmail = async ({resumeTitle, pdfBase64}) =>{
    const response = await API.post("/email/send-resume", {resumeTitle, pdfBase64});    
    return response;
}