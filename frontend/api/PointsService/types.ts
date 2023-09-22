export type Achievement = {
    _id: string;
    name: string;
    nameNormalized: string;
    description: string;
}

export type UserPoints = {
    _id: string;
    userID: string;
    achievmentsNames: string[];
    userPoints: number;
    commonNumber: number;
    rareNumber: number;
    veryCommonNumber: number;
    veryRareNumber: number;
    totalNumber: number;
}