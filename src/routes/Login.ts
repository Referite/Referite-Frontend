import axios from "axios";
import { redirect } from "react-router-dom";


export const Login = async (username: string, password: string, token, setToken) => { 
    const resp = await axios.post(
        'http://127.0.0.1:8000/api/auth/token',
        { 
            username: username, 
            password: password,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    console.log(resp);
    const data = await resp.data;
    console.log(data);
};
