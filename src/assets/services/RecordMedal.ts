import axios from "axios"
import Cookies from "js-cookie";
import { API_URL } from '../../../config.ts'

export async function getMessage(body: any){
    try {
        const msg = await axios.post(`${API_URL}/api/record/verify`, body,
        {
            headers: {
                'authorization': Cookies.get('access_token'),
                'Content-Type': 'application/json'
            }
        });
        return msg;
    } catch (error) {
        throw error; // Re-throw the error for the caller to handle
    }
} 

export async function UpdateToIOC(body: any) {
    try {
        const msg = await axios.post(`${API_URL}/api/record/medal/update`, body,
        {
            headers: {
                'authorization': Cookies.get('access_token'),
                'Content-Type': 'application/json'
            }
        });
        return msg.status;

    } catch (error) {
        throw error;
    }
}
