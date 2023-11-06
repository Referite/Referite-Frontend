import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';
import return_button from '../assets/images/return_button.png';
import { Link } from 'react-router-dom'
export default function Sidebar () {

    return (
        <div className="side-bar">
            <div className="logo">
                <Link to="/">
                    <img src={sidebar_logo} className="logo-pic"/>
                </Link>
            </div>
            <div className="return-button">
                <Link to="/login">
                    <img src={return_button} className='return-pic'/>
                </Link>
            </div>
        </div>
    )
}
