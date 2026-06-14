import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (targetElement)=>{
    const element = targetElement || document.getElementById('resume-template');
    if(!element) throw new Error("Resume template element not found");

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
    });

    // JPEG at 90% quality — ~4-5x smaller than PNG, still sharp for printing
    const imgData = canvas.toDataURL('image/jpeg', 0.90);
    const pdf = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
    const pagew = pdf.internal.pageSize.getWidth();   // 210mm
    const pageh = pdf.internal.pageSize.getHeight();  // 297mm
    const imgh = (canvas.height / canvas.width) * pagew;

    let offsetY = 0;
    let remaining = imgh;

    while(remaining > 0){
        pdf.addImage(imgData, 'JPEG', 0, -offsetY, pagew, imgh);
        remaining -= pageh;
        offsetY += pageh;
        if(remaining > 0) pdf.addPage();
    }

    const base64 = pdf.output('datauristring').split(",")[1];
    return {pdf, base64};
}