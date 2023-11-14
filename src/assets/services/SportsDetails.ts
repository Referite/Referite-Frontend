import axios from "axios"


export async function getSportData(sport_id: string, date: string){
    const res = await axios.get(
        `https://referite-6538ffaf77b0.herokuapp.com/api/record/detail/${date}/${sport_id}`,
        {
            headers: {
                'authorization': "dev",
                'Content-Type': 'application/json'
            }
        }
    );
    
    return res.data
}

