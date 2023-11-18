import axios from "axios"
import Cookies from "js-cookie";

export async function getSportData(sport_id: string, date: string){
    const res = await axios.get(
        `https://referite-6538ffaf77b0.herokuapp.com/api/record/detail/${date}/${sport_id}`,
        {
            headers: {
                'authorization': Cookies.get('access_token'),
                'Content-Type': 'application/json'
            }
        }
    );
    
    return res.data
}

