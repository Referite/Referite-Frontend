export interface SportType {
    type_id: number;
    type_name: string;
    status: string;
}

export interface SportObject {
    sport_id: number;
    sport_name: string;
    sport_icon: string[];
    sport_type: SportType[];
}