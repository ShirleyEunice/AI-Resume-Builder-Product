import { sendResumeEmail } from "../services/email/emailService.js";

export const sendResumeMail = async (req, res)=>{
    try {
        const {resumeTitle, pdfBase64} = req.body;
        if(!pdfBase64) return res.status(400).json({error: "PDF Data is required"});

        await sendResumeEmail({
            to:req.user.email,
            resumeTitle: resumeTitle || "My Resume",
            pdfBase64
        });
        res.json({message: "Email sent successfully"});
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({error: "Failed to send email"});
    }
}