import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';
import return_button from '../assets/images/return_button.png';
import { Link, useNavigate } from 'react-router-dom'
export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div className="side-bar">
            <div className="logo">
                <Link to="/">
                    <img src={sidebar_logo} className="logo-pic"/>
                </Link>
            </div>
            <div className="return-button">
                <button onClick={() => navigate(-1)} className='btn'>
                    <img src={return_button} className='return-pic'/>
                </button>
            </div>
        </div>
    )
}
