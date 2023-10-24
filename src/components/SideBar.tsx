import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';
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
                Return
            </div>
        </div>
    )
}