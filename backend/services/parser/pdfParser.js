import pdf from 'pdf-parse';

export const parsePDF= async (fileBuffer)=>{
    const data = await pdf(fileBuffer);
    return data.text;
}