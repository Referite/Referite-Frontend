import { useEffect, useState } from "react";
import { getSportSchedule, getSportName } from "../assets/services/SportSchedule";
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
import { Link, useNavigate } from 'react-router-dom';
import { override, loaderContainerStyle } from '../styles/ClipLoaderStyles'
import ClipLoader from "react-spinners/ClipLoader";
import '../styles/Home.css';

function Home() {
  const [sportNameList, setSportNameList] = useState<Array<SportObject>>([]);
  const [sportScheduleList, setSportScheduleList] = useState<Array<SportScheduleObject>>([]);
  const [contexts, setContexts] = useState<any[][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
      getSportName(setSportNameList)
      getSportSchedule(setSportScheduleList);
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

  const navigate = useNavigate();
  const handleNavigation = (sportId: number, date: string, event: any) => {
    event.preventDefault();
    navigate(`/record/${sportId}/${date}`);
  };

  useEffect(() => {
    const context: any[][] = Array.from({ length: 46 }, () => []);

    sportScheduleList&&sportScheduleList.map((item) => {
      item.sport.map((sport, index) => {
        // console.log(sport)
        if ( context[index].length == 0 ) {
            context[index].push(sport.sport_name)
        }
        else if (sport.sport_status == "RECORDED") {
          context[index].push(
            <Link to={`/record/${sport.sport_id}/${item.datetime}`} onClick={(event) => handleNavigation(sport.sport_id, item.datetime, event)}>
              <img src={recordedStatusIcon} className="recorded-status-icon-schedule" />
            </Link>
          );
        }
        else if (sport.sport_status == "COMPETITIVE") {
            context[index].push(<a><img src={competitionStatusIcon} className="competition-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "TROPHY") {
            context[index].push(
              <Link to={`/record/${sport.sport_id}/${item.datetime}`} onClick={(event) => handleNavigation(sport.sport_id, item.datetime, event)}>
                <img src={medalStatusIcon} className="medal-status-icon-schedule" />
              </Link>
            );
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
        const tdElement = (
          <td key={i}>
            {contexts[index][i]}
          </td>
        );
        tdElements.push(tdElement);
      }
      return tdElements;
    }
  }

  return (
    <>
    {loading ? (
    <div style={loaderContainerStyle}>
      <ClipLoader
        color="#a6a6a6"
        cssOverride={override}
        size={100}
      />
    </div>
    ) : (
        <div>
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
                              <p style={{fontSize: '2vh'}}>{date.month}</p>
                              <p style={{fontSize: '2vh', color: '#949494'}}>{date.suffix}</p>
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
                            <p style={{marginLeft: '6px', fontSize: '1vw'}}>{rec.sport_name}</p>
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
                            <p style={{marginLeft: '6px', fontSize: '1vw'}}>{rec.sport_name}</p>
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
                            <p style={{marginLeft: '6px', fontSize: '1vw'}}>Ceremonies</p>
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
                            <p style={{marginLeft: '6px', fontSize: '1vw'}}>{rec.sport_name}</p>
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
      </div>
      )}
      
    </>
  )
}

export default Home