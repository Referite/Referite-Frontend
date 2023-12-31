import ceremoniesStatusIcon from '../assets/images/ceremonies_status.png'
import competitionStatusIcon from '../assets/images/competition_status_icon.png'
import medalStatusIcon from '../assets/images/medal_status_icon.png'
import recordedStatusIcon from '../assets/images/recorded_status_icon.png'
import '../styles/StatusIconBar.css'


function StatusIconBar() {
  return (
    <div className="status-icon">
        <div className="icon">
            <img src={ceremoniesStatusIcon} className='ceremonies-icon' />
            <p style={{fontSize: '2vh'}}>Ceremonies</p>
        </div>
        <div className="icon">
            <img src={competitionStatusIcon} className='competition-icon' />
            <p style={{fontSize: '2vh'}}>Competition</p>
        </div>
        <div className="icon">
            <img src={medalStatusIcon} className='medal-status-icon' />
            <p style={{fontSize: '2vh'}}>Not Record Yet</p>
        </div>
        <div className="icon">
            <img src={recordedStatusIcon} className='recorded-status-icon' />
            <p style={{fontSize: '2vh'}}>Already Recorded</p>
        </div>
    </div>
  )
}

export default StatusIconBar;