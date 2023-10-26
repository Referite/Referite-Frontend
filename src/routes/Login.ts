import axios from "axios";
import { redirect } from "react-router-dom";

const login = async (username: string, password: string) => { 
    const resp = await axios.post(
        'http://127.0.0.1:8000/auth/token',
        {
            "username": username,
            "password": password,
        }
     )
   
};

export default login;