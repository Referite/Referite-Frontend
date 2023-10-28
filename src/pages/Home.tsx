import { useEffect, useState } from "react";
import { getSportSchedule, getSportName } from "../routes/SportSchedule";
import { SportScheduleObject } from "../interfaces/SportSchedule";
import Sidebar from "../components/SideBar";
import '../styles/Home.css';

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
      <div className="sport-schudule">
        <table>
        <thead>
            <tr>
                <th>Sports</th>
                <th>Day1</th>
                <th>Day2</th>
                <th>Day3</th>
                <th>Day4</th>
                <th>Day5</th>
                <th>Day6</th>
                <th>Day7</th>
                <th>Day8</th>
                <th>Day9</th>
                <th>Day10</th>
                <th>Day11</th>
                <th>Day12</th>
                <th>Day13</th>
                <th>Day14</th>
                <th>Day15</th>
                <th>Day16</th>
                <th>Day17</th>
                <th>Day18</th>
                <th>Day19</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ceremonies</td>
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
            {
            sportNameList.map((rec) => {
            return (
                <tr key={rec.sport_id}>
                    <td>{rec.sport_name}</td>
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
            })
            }
        </tbody>
        </table>
      </div>
    </>
  )
}

export default Home