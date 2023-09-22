import { UserLocation } from "../../../common/types";

export type BirdLogFinding = {
    latinName: string;
    englishName: string;
}

export type BirdLogAddData = {
    finding: BirdLogFinding;
    location: UserLocation;
    userId: string;
    timestamp: number;
}