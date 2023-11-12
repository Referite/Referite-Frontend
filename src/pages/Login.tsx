import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import referiteLogo from '../assets/images/referite_logo.png';
// import { Authentication }  from '../routes/Authentication'
import '../styles/Login.css';
import LoginWithWrongUAndP from '../components/pop_up/LoginWithWrongUAndP';
import ForgotPassword from '../components/pop_up/ForgotPassword';

function Login() {
  const [refereeID, setRefereeID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      const currentDate = new Date()
      const expireDate = new Date(response.data.expired);

      console.log(currentDate)
      console.log(expireDate)

      Cookies.set('access_token', response.data.access_token, {expires: expireDate})
      navigate('/');
    } catch(err) {
      console.log(err);
      navigate('/login');
      LoginWithWrongUAndP({title: "You cannot login", html: 'Wrong user id or password.'});
    };
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await LoginUser(refereeID, password);
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    ForgotPassword({
      title: 'Forget Password', 
      html: 'If you forget your password, please inform Backend.'
    })
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
        <a className="forgot-password" onClick={handleForgotPassword}>Forgot password</a>
        <button className='sign-in' onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

export default Login;