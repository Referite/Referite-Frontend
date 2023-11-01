import axios from "axios"


export async function getSportData(sport_id: string){
    const res = await axios.get(`http://127.0.0.1:8000/api/record/detail/${sport_id}`)
    
    return res.data
}

