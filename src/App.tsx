import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { CheckToken } from './assets/services/CheckToken';
import Cookies from 'js-cookie';
import Home from './pages/Home';
import Record from './pages/Record';
import Login from './pages/Login';


const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      console.log("Test1");
      navigate('/login');
    } else {
      const decode: {user_id: string, expires: string} = jwtDecode(accessToken);
      console.log(decode.expires);
      if (new Date() >= new Date(decode.expires) ) {
        console.log("Test2");
        Cookies.remove('access_token');
        navigate('/login');
      } else {
        console.log('token is not expired');
        // navigate('/');
      }
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

function App() {
  
  // const [token, setToken] = useState<string>('');
  // const token = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  // const CheckToken = () => {
  //     const accessToken = Cookies.get('access_token')
  //     if (!accessToken) {
  //         console.log("Test1")
  //         navigate('/login')
  //     }
  //     else {
  //         const decode = jwtDecode(accessToken);
  //         console.log(decode)
  //         if (!decode) {
  //             console.log("Test2")
  //             navigate('/login')
  //         }
  //         else {
  //             console.log('token is not expire')
  //             Cookies.remove('access_token')
  //             navigate('/')
  //         }
  //     }
  // }

  return (
    <>
    <BrowserRouter>
      <CheckToken />
      <Routes>
        <Route index element = {<Home />}/>
        <Route path="/" element = {<Home />}/>
        <Route path="/record/:sport_id" element = {<Record />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
