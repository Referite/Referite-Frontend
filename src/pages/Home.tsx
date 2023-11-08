import { useEffect, useState } from "react";
import { getSportSchedule, getSportName } from "../routes/SportSchedule";
import { SportScheduleObject, dateObject } from "../interfaces/SportSchedule";
import { SportObject } from "../interfaces/Sport";
import Sidebar from "../components/SideBar";
import StatusIconBar from "../components/StatusIconBar";
import ceremoniesStatusIcon from '../assets/images/ceremonies_status.png'
import competitionStatusIcon from '../assets/images/competition_status_icon.png'
import medalStatusIcon from '../assets/images/medal_status_icon.png'
import recordedStatusIcon from '../assets/images/recorded_status_icon.png'
import '../styles/Home.css';

function Home() {
  const [sportNameList, setSportNameList] = useState<Array<string>>([]);
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
            // context[index].push('#');
            context[index].push(<a ><img src={recordedStatusIcon} className="recorded-status-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "COMPETITIVE") {
            // context[index].push('*');
            context[index].push(<a ><img src={competitionStatusIcon} className="competition-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "TROPHY") {
            // context[index].push('%');
            context[index].push(<a href={`record/${sport.sport_id}`}><img src={medalStatusIcon} className="medal-status-icon-schedule" /></a>);
        }
        else if (sport.sport_status == "CEREMONIES") {
            // context[index].push('!');
            context[index].push(<a href={`record/${sport.sport_id}`}><img src={ceremoniesStatusIcon} className="ceremonies-icon-schedule" /></a>);
        }
        else {
            context[index].push('');
        }
      })
    })

    setContexts(context)
    console.log(contexts)
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
            sportNameList.map((rec: SportObject, index) => {
              if (!['Beach Volleyball', 'Table Tennis', 'Volleyball', 'Ceremonies'].includes(rec.sport_name)) {
                return (
                  <tr key={rec.sport_id}>
                      <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                        <div style={{marginTop: '5px', width: '4vw'}}>
                          {rec.sport_icon && rec.sport_icon[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
                              <path fill="#242752" d={rec.sport_icon[0]}></path>
                            </svg>
                          )}
                        </div>
                        <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                      </td>
                      {showSchedule(rec.sport_name, index)}
                      {/* <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td> */}
                  </tr>
              )
              } 
              else {
                if (rec.sport_name == 'Beach Volleyball') {
                  return (
                    <tr key={rec.sport_id}>
                      <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                        <div style={{marginTop: '5px', width: '4vw'}}>
                          <circle cx="137.56" cy="261.55" r="2.5"></circle>
                          <circle cx="137.56" cy="228.61" r="2.5"></circle>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
                            <circle cx="137.56" cy="261.55" r="2.5"></circle>
                            <circle cx="137.56" cy="228.61" r="2.5"></circle>
                            <circle cx="139.88" cy="279.62" r="2.5"></circle>
                            <circle cx="155.21" cy="259.29" r="2.5"></circle>
                            <circle cx="152.76" cy="228.61" r="2.5"></circle>
                            <circle cx="178.68" cy="228.61" r="2.5"></circle>
                            <circle cx="166.68" cy="228.61" r="2.5"></circle>
                            <circle cx="153.7" cy="228.61" r="2.5"></circle>
                            <circle cx="145.16" cy="228.61" r="2.5"></circle>
                            <circle cx="159.66" cy="228.61" r="2.5"></circle>
                            <circle cx="161.3" cy="228.61" r="2.5"></circle>
                            <circle cx="129.96" cy="228.61" r="2.5"></circle>
                            <circle cx="173.24" cy="228.61" r="2.5"></circle>
                            <path fill="#242752" d={rec.sport_icon[0]}></path>
                            <circle cx="192.52" cy="226.06" r="2.5"></circle>
                            <circle cx="188.32" cy="241.36" r="2.5"></circle>
                            <circle cx="177.89" cy="259.44" r="2.5"></circle>
                            <circle cx="374.04" cy="262.23" r="2.5"></circle>
                            <circle cx="315.68" cy="262.64" r="2.5"></circle>
                            <circle cx="124.68" cy="268.98" r="2.5"></circle>
                            <circle cx="311.48" cy="277.94" r="2.5"></circle>
                            <circle cx="337.32" cy="258.86" r="2.5"></circle>
                            <circle cx="325.31" cy="284.73" r="2.5"></circle>
                            <circle cx="326.1" cy="244.56" r="2.5"></circle>
                            <path fill="#242752" d={rec.sport_icon[1]}></path>
                            <circle cx="393.89" cy="252.38" r="2.5"></circle>
                            <circle cx="389.24" cy="267.79" r="2.5"></circle>
                            <circle cx="379.32" cy="235.02" r="2.5"></circle>
                            <path fill="#242752" d={rec.sport_icon[2]}></path>
                            <circle cx="330.76" cy="306.34" r="2.5"></circle>
                            <circle cx="351.24" cy="260.19" r="2.5"></circle>
                            <circle cx="366.44" cy="242.45" r="2.5"></circle>
                            <circle cx="364.11" cy="224.38" r="2.5"></circle>
                            <circle cx="110.1" cy="251.62" r="2.5"></circle>
                            <circle cx="114.75" cy="236.21" r="2.5"></circle>
                            <circle cx="366.44" cy="275.39" r="2.5"></circle>
                            <circle cx="348.78" cy="244.71" r="2.5"></circle>
                            <circle cx="358.84" cy="298.2" r="2.5"></circle>
                            <circle cx="350.3" cy="273.15" r="2.5"></circle>
                            <circle cx="342.7" cy="293.5" r="2.5"></circle>
                            <circle cx="344.34" cy="226.32" r="2.5"></circle>
                          </svg>
                        </div>
                        <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                      </td>
                      <td></td>
                      {showSchedule(rec.sport_name, index)}
                    </tr>
                  )
                }
                else if (rec.sport_name == 'Ceremonies') {
                  return (
                    <tr>
                      <td style={{display: 'flex', justifyItems: 'center', alignItems:'center'}}>
                        <div style={{marginTop: '5px', marginBottom: 'auto', width: '4vw'}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 140 160" xmlSpace="preserve" className="white "> 
                              <g className="emblem"> 
                              {rec.sport_icon && rec.sport_icon[0] && (
                                <path d={rec.sport_icon[0]} fill="#242752">
                                </path>
                              )}
                              {rec.sport_icon && rec.sport_icon[1] && (
                                <path d={rec.sport_icon[1]} fill="#242752">
                                </path>
                              )}
                              </g>
                            </svg>
                        </div>
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
                        <div style={{marginTop: '5px', width: '4vw'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
                          {rec.sport_icon && rec.sport_icon[0] && (
                            <path fill="#242752" d={rec.sport_icon[0]}></path>
                          )}
                          {rec.sport_icon && rec.sport_icon[1] && (
                            <path fill="#242752" d={rec.sport_icon[1]}></path>
                          )}
                          </svg>
                        </div>
                        <p style={{marginLeft: '6px'}}>{rec.sport_name}</p>
                      </td>
                      {showSchedule(rec.sport_name, index)}
                    </tr>
                  )
                }
              }
            })
            }
            {/* {contexts.map((sport, index) => (
                
                <tr key={index}>
                    {sport.map((eachDate, index) => (
                        <td key={index}>{eachDate}</td>
                    ))}
                </tr>
            ))} */}
        </tbody>
        </table>
      </div>
      <StatusIconBar/>
    </>
  )
}

export default Home