import axios from "axios";
import { SportScheduleObject } from "../interfaces/SportSchedule";
import { SportObject } from "../interfaces/Sport";


const sportNameURL = 'http://127.0.0.1:8000/api/schedule/sport';
const sportScheduleURL = 'http://127.0.0.1:8000/api/schedule/all'; // sport schedule API endpoint URL


export const getSportName = (setSportNameList: React.Dispatch<React.SetStateAction<Array<SportObject>>>, 
    setSportNameListStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    axios.get(sportNameURL)
    .then((response) => {
        console.log(response.data.sport_list);
        setSportNameListStatus(true);
        setSportNameList(response.data.sport_list);
    })
    .catch((error) => {
        console.log(error);
    });
}


export const getSportSchedule = async (setSportScheduleList: React.Dispatch<React.SetStateAction<SportScheduleObject[]>>, 
    setSportScheduleListStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSportScheduleListStatus(false);
    await axios.get(sportScheduleURL)
    .then((response) => {
        console.log(response.data.schedule_list);
        setSportScheduleListStatus(true);
        setSportScheduleList(response.data.schedule_list);

        // const testArray: Array<string> = [];
        // for (let i = 0; i < response.data.schedule_list.length; i++) {
        //     if (!testArray.includes(response.data.schedule_list[i].datetime)) {
        //         testArray.push(response.data.schedule_list[i].datetime)
        //     }
        // }
        // console.log(testArray)
    })
    .catch((error) => {
        console.log(error);
    });
};
