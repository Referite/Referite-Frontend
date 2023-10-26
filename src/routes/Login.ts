import axios from "axios";
import { redirect } from "react-router-dom";

const login = async (username: string, password: string) => { 
    const resp = await axios.post(
        'http://127.0.0.1:8000/auth/token',
         { username, password },
         { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
     );
        console.log(resp);
        const data = await resp.data;
        console.log(data);

    
};

export default login;