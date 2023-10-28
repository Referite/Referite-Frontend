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
                <th>24</th>
                <th>25</th>
                <th>26</th>
                <th>27</th>
                <th>28</th>
                <th>29</th>
                <th>30</th>
                <th>31</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
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
                    <td>
                      {rec.sport_name}
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
            })
            }
        </tbody>
        </table>
      </div>
    </>
  )
}

export default Home