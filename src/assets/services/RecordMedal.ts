import axios from "axios"

export async function getMessage(body: any){
    try {
        const msg = await axios.post(`http://127.0.0.1:8000/api/record/verify`, body);
        return msg;
    } catch (error) {
        throw error; // Re-throw the error for the caller to handle
    }
} 
