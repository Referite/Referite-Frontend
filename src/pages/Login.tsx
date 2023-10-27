import { useEffect, useState, useContext } from 'react';
import referiteLogo from '../assets/images/referite_logo.png'
import Login from '../routes/Login';
import { UserContext } from '../context/UserContext';
import '../styles/Login.css'
// import { hashSync } from 'bcrypt-ts';

function Login() {
  const [refereeID, setRefereeID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [errorMessage, setErrorMessage] = useState("");
  // const [, setToken] = useContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>] | null>(UserContext);

  // const submitLogin = async () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   };

  //   const response = await fetch("/api/token", requestOptions);
  //   const data = await response.json();

  //   if (!response.ok) {
  //     setErrorMessage(data.detail);
  //   } else {
  //     setToken(data.access_token);
  //   }
  // };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // submitLogin();
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
        />
        <label className="label-name">Password</label>
        <input className="textbox password-input"
          type="password" 
          placeholder="Type your password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="forgot-password" href="">Forgot password</a>
        <button className='sign-in' onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  )
}

export default Login