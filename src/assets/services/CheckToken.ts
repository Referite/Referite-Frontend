import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const CheckToken = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        console.log("Test1");
        navigate('/login');
      } else {
        const decode: {user_id: string, expires: string} = jwtDecode(accessToken);
        console.log(decode.expires);
        if (new Date(decode.expires) >= new Date()) {
          console.log("Test2");
          Cookies.remove('access_token');
          navigate('/login');
        } else {
          console.log('token is not expired');
          navigate('/');
        }
      }
    }, [navigate]);
  
    return null; // This component doesn't render anything
};
