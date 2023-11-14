export interface SportType {
    type_id: number;
    type_name: string;
    status: string;
    competition_date: string;
    participating_country_count: number;
    participating_countries: Array<string>;
    participants: any;
}

export interface SportObject {
    sport_id: number;
    sport_name: string;
    sport_icon: Array<string>;
    sport_type: Array<SportType>;
}

export interface SportData {
    sport_name: string;
    sport_types: Array<SportType>;
}