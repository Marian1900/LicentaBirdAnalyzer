import { UserLocation } from "../../screens/types";

export type BirdLogFinding = {
    latinName: string;
    englishName: string;
    possibility: number;
}

export type BirdLogAddData = {
    finding: BirdLogFinding;
    location: UserLocation;
    userId: string;
    timestamp: number;
}

export type BirdLogGetData = BirdLogAddData & {
    _id: string;
}

export type Rarity = "very rare" | "rare" | "common" | "very common";

export type Specie = {
    _id: string;
    latinName: string;
    englishName: string;
    rarity: Rarity;
    sorID: string;
};