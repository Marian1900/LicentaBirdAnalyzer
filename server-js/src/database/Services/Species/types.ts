
export type Rarity = "very rare" | "rare" | "common" | "very common";

export type SpecieType = {
    _id: string;
    latinName: string;
    englishName: string;
    rarity: Rarity;
    sorID: string;
};