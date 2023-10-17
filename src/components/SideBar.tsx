import '../styles/SideBar.css';
import sidebar_logo from '../assets/images/sidebar_logo.png';

export default function Sidebar () {
    return (
        <div className="side-bar">
            <div className="logo">
                <img src={sidebar_logo} className="logo-pic"/>
            </div>
            <div className="return-button">
                Return
            </div>
        </div>
    )
}