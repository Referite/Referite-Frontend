import axios from 'axios';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types'
import referiteLogo from '../assets/images/referite_logo.png'
import { useNavigate } from 'react-router-dom';
// import { Authentication }  from '../routes/Authentication'
import '../styles/Login.css'

function Login({ setToken }) {
  const [refereeID, setRefereeID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const LoginUser = async (username: string, password: string) => { 
    await axios.post(
        'http://127.0.0.1:8000/api/auth/token',
        { 
            username: username, 
            password: password,
        },
        { 
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
        }
    ).then((res) => {
      console.log(res);
      console.log(res.data.access_token);
      setToken(res.data.access_token)
      // window.location.href = '/home';
      navigate('/home');
    }).catch((err) => {
  
      console.log(err);
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // submitLogin();
    await LoginUser(refereeID, password);
  }

  useEffect(() => {

  }, [refereeID, password]);

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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login