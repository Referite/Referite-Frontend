import { useEffect, useState } from "react";
import { getSportSchedule, getSportName } from "../routes/SportSchedule";
import { SportScheduleObject } from "../interfaces/SportSchedule";
import { SportObject } from "../interfaces/Sport";
import Sidebar from "../components/SideBar";
import StatusIconBar from "../components/StatusIconBar";
import '../styles/Home.css';
import ceremoniesIcon from '../assets/images/ceremonies_status.png';
import competitiveIcon from '../assets/images/competition_status_icon.png';
import recordedIcon from '../assets/images/recorded_status_icon.png';
import trophyIcon from '../assets/images/medal_status_icon.png';

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

  const dateColumns = [
    { day: '24', month: 'Jul', suffix: 'D-2' },
    { day: '25', month: 'Jul', suffix: 'D-1' },
    { day: '26', month: 'Jul', suffix: 'D0' },
    { day: '27', month: 'Jul', suffix: 'D1' },
    { day: '28', month: 'Jul', suffix: 'D2' },
    { day: '29', month: 'Jul', suffix: 'D3' },
    { day: '30', month: 'Jul', suffix: 'D4' },
    { day: '31', month: 'Jul', suffix: 'D5' },
    { day: '01', month: 'Aug', suffix: 'D6' },
    { day: '02', month: 'Aug', suffix: 'D7' },
    { day: '03', month: 'Aug', suffix: 'D8' },
    { day: '04', month: 'Aug', suffix: 'D9' },
    { day: '05', month: 'Aug', suffix: 'D10' },
    { day: '06', month: 'Aug', suffix: 'D11' },
    { day: '07', month: 'Aug', suffix: 'D12' },
    { day: '08', month: 'Aug', suffix: 'D13' },
    { day: '09', month: 'Aug', suffix: 'D14' },
    { day: '10', month: 'Aug', suffix: 'D15' },
    { day: '11', month: 'Aug', suffix: 'D16' },
  ];

  const statusIcons = [
    { status: 'Ceremonies', icon: ceremoniesIcon },
    { status: 'Competitive', icon: competitiveIcon },
    { status: 'Recorded', icon: recordedIcon },
    { status: 'Trophy', icon: trophyIcon },
  ];


  useEffect(() => {
  const header = ['Name'];
  const context: any[][] = Array.from({ length: 45 }, () => []);

  sportScheduleList && sportScheduleList.forEach((item) => {
    header.push(item.datetime);

    item.sport.forEach((sport, index) => {
      if (!context[index]) {
        context[index] = [];
      }

      // Check if sport_status is null
      let symbol = '';
      if (sport.sport_status === 'RECORDED') {
        symbol = '#';
      } else if (sport.sport_status === 'COMPETITIVE') {
        symbol = '*';
      } else if (sport.sport_status === 'TROPHY') {
        symbol = '%';
      } else if (sport.sport_status === 'CEREMONIES') {
        symbol = '!';
      } else {
        symbol = '';
      }
      // push sport_status into context
      context[index].push(symbol);

    });

    console.log('Context :', context);
  });


  setContexts(context);
}, [sportScheduleList]);



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
                        <p style={{ marginBottom: '0px' }}>{date.day}</p>
                        <p style={{ fontSize: '15px' }}>{date.month}</p>
                        <p style={{ fontSize: '15px', color: '#949494' }}>{date.suffix}</p>
                      </div>
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              sportNameList.map((rec: SportObject) => {
                if (!['Beach Volleyball', 'Table Tennis', 'Volleyball', 'Ceremonies'].includes(rec.sport_name)) {
                  console.log(rec.sport_icon[0])
                  return (
                    <tr key={rec.sport_id}>
                      <td style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                        <div style={{ marginTop: '5px', width: '4vw' }}>
                          {rec.sport_icon && rec.sport_icon[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
                              <path fill="#242752" d={rec.sport_icon[0]}></path>
                            </svg>
                          )}
                        </div>
                        <p style={{ marginLeft: '6px' }}>{rec.sport_name}</p>
                      </td>
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
                      <td></td>
                      <td></td>
                    </tr>
                  )
                }
                else {
                  if (rec.sport_name == 'Beach Volleyball') {
                    return (
                      <tr key={rec.sport_id}>
                        <td style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                          <div style={{ marginTop: '5px', width: '4vw' }}>
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
                          <p style={{ marginLeft: '6px' }}>{rec.sport_name}</p>
                        </td>
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
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  }
                  else if (rec.sport_name == 'Ceremonies') {
                    return (
                      <tr>
                        <td style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                          <div style={{ marginTop: '5px', marginBottom: 'auto', width: '4vw' }}>
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
                          <p style={{ marginLeft: '6px' }}>Ceremonies</p>
                        </td>
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
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  }
                  else {
                    return (
                      <tr key={rec.sport_id}>
                        <td style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                          <div style={{ marginTop: '5px', width: '4vw' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
                              {rec.sport_icon && rec.sport_icon[0] && (
                                <path fill="#242752" d={rec.sport_icon[0]}></path>
                              )}
                              {rec.sport_icon && rec.sport_icon[1] && (
                                <path fill="#242752" d={rec.sport_icon[1]}></path>
                              )}
                            </svg>
                          </div>
                          <p style={{ marginLeft: '6px' }}>{rec.sport_name}</p>
                        </td>
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
                        <td></td>
                        <td></td>
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
      <StatusIconBar />
    </>
  )
}

export default Home