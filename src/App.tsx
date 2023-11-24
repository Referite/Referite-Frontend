import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './pages/Home';
import Record from './pages/Record';
import Login from './pages/Login';


const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      navigate('/login');
    } else {
      const decode: {user_id: string, expires: string} = jwtDecode(accessToken);
      if (new Date() >= new Date(decode.expires) ) {
        Cookies.remove('access_token');
        navigate('/login');
      } else {
        console.log('token is not expired');
      }
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <>
    <BrowserRouter>
      <CheckToken />
      <Routes>
        <Route index element = {<Home />}/>
        <Route path="/" element = {<Home />}/>
        <Route path="/record/:sport_id/:date" element={<Record />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
