import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';
import information_logo from '../assets/images/information_icon.png'
import logout_logo from '../assets/images/logout_logo.png'
import { Link } from 'react-router-dom'

export default function Sidebar () {

    return (
        <div className="side-bar">
            <div className="logo">
                <Link to="/">
                    <img src={sidebar_logo} className="sidebar-logo-pic"/>
                </Link>
            </div>
            <div className='information'>
                <img src={information_logo} className="information-logo-pic" />
            </div>
            <div className="return-button">
                <Link to="/login">
                    <img src={logout_logo} className="logout-logo-pic" />
                </Link>
            </div>
        </div>
    )
}
