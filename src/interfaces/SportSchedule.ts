export interface SportType {
    revision_id: null;
    type_id: number;
    type_name: string;
    status: string;
}

export interface SportSchedule {
    revision_id: null;
    sport_id: number;
    sport_name: string;
    sport_type: Array<SportType>;
    is_ceremonies: boolean;
}

export interface SportScheduleObject {
    datetime: string;
    sport: Array<SportSchedule>;
}
