import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResumeEmail = async ({to, resumeTitle, pdfBase64})=>{
    //converts BAse64 string -> binary data -> buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject: `Your Resume: ${resumeTitle}`,
        html: `<h2>Hi, there!</h2><p>Your resume "<strong>${resumeTitle}</strong>" is ready. Best of luck with your applications!</p>`,
        attachments: [
            {
                filename: `${resumeTitle}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    })
}