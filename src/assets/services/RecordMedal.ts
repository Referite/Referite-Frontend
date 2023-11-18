import axios from "axios"

export async function getMessage(body: any){
    try {
        const msg = await axios.post(`https://referite-6538ffaf77b0.herokuapp.com/api/record/verify`, body,
        {
            headers: {
                'authorization': "dev",
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
        const msg = await axios.post(`https://referite-6538ffaf77b0.herokuapp.com/api/record/medal/update`, body,
        {
            headers: {
                'authorization': "dev",
                'Content-Type': 'application/json'
            }
        });
        return msg.status;

    } catch (error) {
        throw error;
    }
}
