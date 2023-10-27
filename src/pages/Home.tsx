import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { getSportSchedule, getSportName } from "../routes/SportSchedule";
import '../styles/Home.css';
import { SportScheduleObject } from "../interfaces/SportSchedule";

function Home() {
  const [sportNameList, setSportNameList] = useState<Array<string>>([]);
  const [sportScheduleList, setSportScheduleList] = useState<Array<SportScheduleObject>>([]);
  const [sportNameListStatus, setSportNameListStatus] = useState<boolean>(false);
  const [sportScheduleListStatus, setSportScheduleListStatus] = useState<boolean>(false);


  useEffect(() => {
    getSportName(setSportNameList, setSportNameListStatus)
    getSportSchedule(setSportScheduleList, setSportScheduleListStatus);
  }, [])

  return (
    <>
      <Sidebar />
      <div className="home-page-title">
        {/* <h1>
          Home page for future development
        </h1> */}
        {/* {sportNameList.map((sportName: string) => {
          return <p>{sportName}</p>
        })
        } */}
      </div>
      <div className="sport-schudule">
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {
              sportNameList.sort((a, b) => a.sport_name[0].localeCompare(b.sport_name[0])).map((rec) => {
                return (
                  <tr key={rec.sport_id}>
                    <td>{rec.sport_name}</td>
                    <td></td>
                    <td></td>
                  </tr>
                )
                })
              }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home