import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';
import information_logo from '../assets/images/information_icon.png'
import logout_logo from '../assets/images/logout_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Sidebar () {
    const navigate = useNavigate();

    const Logout = async () => {

        const response = await axios.get(
            'http://127.0.0.1:8000/api/auth/logout', {
                headers: {
                    'authorization': Cookies.get('access_token'),
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data.message);
        Cookies.remove('access_token')
        navigate('/login')
    }

    const handleLogOut = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        await Logout();
    }

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
                    <img src={logout_logo} onClick={handleLogOut} className="logout-logo-pic" />
                </Link>
            </div>
        </div>
    )
}
