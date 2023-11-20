import axios from "axios"
import Cookies from "js-cookie";
import { API_URL } from '../../../config.ts'

export async function getSportData(sport_id: string, date: string){
    const res = await axios.get(
        `${API_URL}/api/record/detail/${date}/${sport_id}`,
        {
            headers: {
                'authorization': Cookies.get('access_token'),
                'Content-Type': 'application/json'
            }
        }
    );
    
    return res.data
}
