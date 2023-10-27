import axios from "axios";
import { SportScheduleObject } from "../interfaces/SportSchedule";

const sportScheduleURL = 'http://127.0.0.1:8000/api/schedule/all'; // sport schedule API endpoint URL


export const getSportName = async (setSportNameList: React.Dispatch<React.SetStateAction<Array<string>>>, 
    setSportNameListStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    await axios.get(sportScheduleURL)
    .then((response) => {
        console.log(response.data.schedule_list);
        setSportNameListStatus(true);
        const scheduleList:Array<SportScheduleObject> = response.data.schedule_list;
        let sportName:Array<string> = [];
        for (let i = 0; i < scheduleList.length; i++) {
            if (!sportName.includes(scheduleList[i].sport[0].sport_name)) {
                sportName.push(scheduleList[i].sport[0].sport_name);
            }
        }
        console.log(sportName);
        setSportNameList(sportName);
    })
}


export const getSportSchedule = async (setSportScheduleList: React.Dispatch<React.SetStateAction<SportScheduleObject[]>>, 
    setSportScheduleListStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    setSportScheduleListStatus(false);
    await axios.get(sportScheduleURL)
    .then((response) => {
        console.log(response.data.schedule_list);
        setSportScheduleListStatus(true);
        setSportScheduleList(response.data.schedule_list);
    })
    .catch((error) => {
        console.log(error);
    });
};
