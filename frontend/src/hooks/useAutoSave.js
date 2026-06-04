import { updateResumeById } from "@/services/resumeService";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const useAutoSave = ()=>{
    const currentResume = useSelector((state)=> state.resume.currentResume);

    useEffect(()=>{

        if(!currentResume._id) return;

        const debouncedSave = debounce(async ()=>{
            try{
                await updateResumeById(currentResume._id, currentResume);
                console.log("Resume auto saved");
            } catch (error) {
                console.error("Error saving resume:", error);
            }
        }, 1500);
        
        debouncedSave();
        return ()=>{
            debouncedSave.cancel();
        };
    }, [currentResume])
}

export default useAutoSave;