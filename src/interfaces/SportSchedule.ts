export interface SportType {
    type_id: number;
    type_name: string;
    status: string;
}

export interface SportSchedule {
    sport_id: number;
    sport_name: string;
    sport_type: Array<SportType>;
    sport_status: string;
}

export interface SportScheduleObject {
    datetime: string;
    sport: Array<SportSchedule>;
}

export interface dateObject {
    day: string;
    month: string;
    suffix: string;
}
