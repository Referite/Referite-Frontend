import { useEffect, useState } from "react";
import { getSportSchedule, getSportName } from "../routes/SportSchedule";
import { SportScheduleObject, dateObject } from "../interfaces/SportSchedule";
import { SportObject } from "../interfaces/Sport";
import Sidebar from "../components/SideBar";
import StatusIconBar from "../components/StatusIconBar";
import SportIcon from "../components/icon/SportIcon";
import SportIcon2 from "../components/icon/SportIcon2";
import BeachVolleyballIcon from "../components/icon/BeachVolleyballIcon";
import CeremoniesIcon from "../components/icon/CeremoniesIcon";
import ceremoniesStatusIcon from '../assets/images/ceremonies_status.png'
import competitionStatusIcon from '../assets/images/competition_status_icon.png'
import medalStatusIcon from '../assets/images/medal_status_icon.png'
import recordedStatusIcon from '../assets/images/recorded_status_icon.png'
import '../styles/Home.css';

function Home() {
  const [sportNameList, setSportNameList] = useState<Array<SportObject>>([]);
  const [sportScheduleList, setSportScheduleList] = useState<Array<SportScheduleObject>>([]);
  const [sportNameListStatus, setSportNameListStatus] = useState<boolean>(false);
  const [sportScheduleListStatus, setSportScheduleListStatus] = useState<boolean>(false);
  const [contexts, setContexts] = useState<any[][]>([]);

  useEffect(() => {
      getSportName(setSportNameList, setSportNameListStatus)
      getSportSchedule(setSportScheduleList, setSportScheduleListStatus);
  }, [])

  const dateColumns: dateObject[] = [];

  for (const i in sportScheduleList) {
    const datetime = new Date(sportScheduleList[i].datetime);
    const day = String(datetime.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[datetime.getMonth()];
    const suffix = `D${parseInt(i) - 2}`;

    dateColumns.push({ 
      "day": day, 
      "month": month, 
      "suffix": suffix 
    });
  }

  useEffect(() => {
    const context: any[][] = Array.from({ length: 46 }, () => []);

    sportScheduleList&&sportScheduleList.map((item) => {
      item.sport.map((sport, index) => {
        console.log(sport)
        if ( context[index].length == 0 ) {
            context[index].push(sport.sport_name)
        }
        else if (sport.sport_status == "RECORDED") {
            context[index].push(<a href={`record/${sport.sport_id}`}><img src={recordedStatusIcon} className="recorded-status-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "COMPETITIVE") {
            context[index].push(<a><img src={competitionStatusIcon} className="competition-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "TROPHY") {
            context[index].push(<a href={`record/${sport.sport_id}`}><img src={medalStatusIcon} className="medal-status-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "CEREMONIES") {
            context[index].push(<a><img src={ceremoniesStatusIcon} className="ceremonies-icon-schedule" /></a>);
        }
        else {
            context[index].push('');
        }
      })
    })
    setContexts(context)
  }, [sportScheduleList])

  function showSchedule(sportName: string, index: number) {
    if (sportName == contexts[index][0]) {
      const tdElements = [];
      for (let i = 1; i <= contexts[index].length; i++) {
        tdElements.push(<td key={i}>{contexts[index][i]}</td>);
      }
      return tdElements;
    }
  }

  return (
    <>
      <Sidebar />
      <div className="sport-schudule">
        <table>
          <thead>
              <tr>
                  <th>Sports</th>
                  {
                    dateColumns.map((date, index) => {
                      return (
                        <th key={index}>
                          <div>
                            <p style={{marginBottom: '0px'}}>{date.day}</p>
                            <p style={{fontSize: '15px'}}>{date.month}</p>
                            <p style={{fontSize: '15px', color: '#949494'}}>{date.suffix}</p>
                          </div>
                        </th>
                      )
                    })
                  }
              </tr>
          </thead>
          <tbody>
              {
                sportNameList.map((rec: SportObject, index: number) => {
                if (!['Beach Volleyball', 'Table Tennis', 'Volleyball', 'Ceremonies'].includes(rec.sport_name)) {
                  return (
                    <tr key={rec.sport_id}>
                        <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                          <SportIcon rec={rec} viewBox={"0 0 504 504"} />
                          <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                        </td>
                        {showSchedule(rec.sport_name, index)}
                    </tr>
                  )
                } 
                else {
                  if (rec.sport_name == 'Beach Volleyball') {
                    return (
                      <tr key={rec.sport_id}>
                        <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                          <BeachVolleyballIcon rec={rec} viewBox={"0 0 504 504"} />
                          <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                        </td>
                        {showSchedule(rec.sport_name, index)}
                      </tr>
                      )
                  }
                  else if (rec.sport_name == 'Ceremonies') {
                    return (
                      <tr>
                        <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                          <CeremoniesIcon rec={rec} viewBox={"0 0 140 160"} />
                          <p style={{marginLeft: '6px'}}>Ceremonies</p>
                        </td>
                        {showSchedule(rec.sport_name, index)}
                      </tr>
                    )
                  }
                  else {
                    return (
                      <tr key={rec.sport_id}>
                        <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                          <SportIcon2 rec={rec} viewBox={"0 0 504 504"} />
                          <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                        </td>
                        {showSchedule(rec.sport_name, index)}
                      </tr>
                    )
                  }
                }
                })
              }
          </tbody>
        </table>
      </div>
      <StatusIconBar/>
    </>
  )
}

export default Home