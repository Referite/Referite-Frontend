import '../styles/Login.css'
import referiteLogo from '../assets/images/referite_logo.png'
import BGChanger from '../components/BGChanger'


function Login() {

  return (
    <div className="login">
      <BGChanger/>
        <img src={referiteLogo} alt="referite logo" />
        <div className="box">
            <label className="label-name">Referee ID</label>
            <input className="textbox id-input" type="text" placeholder="Type your ID" />
            <label className="label-name">Password</label>
            <input className="textbox password-input" type="password" placeholder="Type your password" />
            <a className="forgot-password" href="">Forgot password</a>
            <button>Sign In</button>
        </div>
    </div>
  )
}

export default Login