import API from "@/api/axios";

export const getMe = async ()=>{
    const res = await API.get("/auth/me");
    return res.data.user;
}