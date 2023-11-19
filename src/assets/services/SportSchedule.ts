import axios from "axios";
import Cookies from "js-cookie";
import { SportScheduleObject } from "../../interfaces/SportSchedule";
import { SportObject } from "../../interfaces/Sport";

const sportNameURL = 'https://referite-6538ffaf77b0.herokuapp.com/api/schedule/sport';
const sportScheduleURL = 'https://referite-6538ffaf77b0.herokuapp.com/api/schedule/all';

export const getSportName = (setSportNameList: React.Dispatch<React.SetStateAction<Array<SportObject>>>) => {
    axios.get(sportNameURL, {
        headers: {
            'authorization': Cookies.get('access_token'),
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {

        console.log(response.data.sport_list);
        setSportNameList(response.data.sport_list);
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getSportSchedule = async (setSportScheduleList: React.Dispatch<React.SetStateAction<SportScheduleObject[]>>) => {
    await axios.get(sportScheduleURL, {
        headers: {
            'authorization': Cookies.get('access_token'),
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response.data.schedule_list);
        setSportScheduleList(response.data.schedule_list);
    })
    .catch((error) => {
        console.log(error);
    });
};
