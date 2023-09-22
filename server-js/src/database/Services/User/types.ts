
export enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal",
}

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type AchievementsDictionary = {
    userID: string;
    achievmentsNames: Array<String>;
    userPoints: number;
    commonNumber: number;
    rareNumber: number;
    veryCommonNumber: number;
    veryRareNumber: number;
    totalNumber: number;
}