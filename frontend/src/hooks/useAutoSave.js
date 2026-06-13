import { updateResumeById } from "@/services/resumeService";
import debounce from "lodash.debounce";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const useAutoSave = () => {
    const currentResume = useSelector((state) => state.resume.currentResume);

    // Always point to the latest resume so the debounced function (which closes
    // over this ref) sends the freshest data rather than a stale snapshot.
    const resumeRef = useRef(currentResume);
    resumeRef.current = currentResume;

    // Create the debounced function ONCE for the lifetime of the hook.
    // Keeping it in a ref prevents it being re-created on every render, which
    // would reset the timer and cause the save to never fire.
    const debouncedSave = useRef(
        debounce(async () => {
            const resume = resumeRef.current;
            if (!resume._id) return;
            try {
                await updateResumeById(resume._id, resume);
                console.log("Resume auto saved");
            } catch (error) {
                console.error("Error auto-saving resume:", error);
            }
        }, 1500)
    ).current;

    // Trigger on every Redux change.
    // Because debouncedSave is stable, rapid changes correctly accumulate
    // into a single trailing call 1500 ms after the last change.
    useEffect(() => {
        if (!currentResume._id) return;
        debouncedSave();
    }, [currentResume]);

    // Cancel on unmount so we don't fire after the wizard is gone.
    useEffect(() => {
        return () => debouncedSave.cancel();
    }, []);
};

export default useAutoSave;
