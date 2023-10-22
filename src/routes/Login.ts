import axios from "axios";
import { redirect } from "react-router-dom";

const login = async (username: string, password: string) => { 
    const resp = await axios.post(
        'http://127.0.0.1:8000/login/verify',
        {
            "username": username,
            "password": password,
            maxRedirects: 5
        }
     ).then(response =>{
        console.log(response.status);
        console.log(response.data);
        console.log(response.data[1][1]);
        return redirect(response.data[1][1]);
     }).catch(error =>{
        console.error(error);
     });
        console.log(resp);

    
};

export default login;