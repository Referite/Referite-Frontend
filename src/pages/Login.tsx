import { useEffect, useState } from 'react';
import referiteLogo from '../assets/images/referite_logo.png'
import login from '../routes/Login';
import '../styles/Login.css'
// import { hashSync } from 'bcrypt-ts';

function Login() {
  const [refereeID, setRefereeID] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // console.log(refereeID, password)
    // console.log(
    //   {
    //     "id": refereeID,
    //     "password": hashSync(password, 10),
    //   }
    // )
    login(refereeID, password)
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