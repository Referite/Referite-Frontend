import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import referiteLogo from '../assets/images/referite_logo.png';
// import { Authentication }  from '../routes/Authentication'
import '../styles/Login.css';

function Login() {
  const [refereeID, setRefereeID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const LoginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(
          'http://127.0.0.1:8000/api/auth/token',
          { 
              username: username, 
              password: password,
          },
          { 
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            // withCredentials: true,
          }
      )
      console.log(response.data.access_token);
      console.log(response.data.expired);
      // const currentDate = new Date()
      const expireDate = new Date(response.data.expired);
      // const clientsTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone


      // console.log(currentDate)
      console.log(expireDate)

      Cookies.set('access_token', response.data.access_token, {expires: 1})
      // const cookies = Cookies.set('access_token', response.data.access_token)
      // console.log(cookies)
      // setToken(res.data.access_token)
      // window.location.href = '/';
      navigate('/');
    } catch(err) {
  
      console.log(err);
    };
  };

  useEffect(() => {
    console.log(Cookies.get('access_token'))
  }, [refereeID, password]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await LoginUser(refereeID, password);
  }

  return (
    <div className="login">
      <img src={referiteLogo} alt="referite logo" />
      <div className="box">
        <label className="label-name">Referee ID</label>
        <input className="textbox id-input"
          type="text"
          placeholder="Type your ID"
          value={refereeID}
          onChange={(e) => setRefereeID(e.target.value)}
          required
        />
        <label className="label-name">Password</label>
        <input className="textbox password-input"
          type="password" 
          placeholder="Type your password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a className="forgot-password" href="">Forgot password</a>
        <button className='sign-in' onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

export default Login;