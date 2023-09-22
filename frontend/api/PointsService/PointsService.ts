import AxiosAPI from "../AxiosApi";
import { BASE_URLS } from "../constants";
import { Achievement, UserPoints } from "./types";

export class PointsService {
    public static getAchievements(userID: string): Promise<Achievement[]> {
        return AxiosAPI.get(`${BASE_URLS.SERVER}/userAchievements?userID=${userID}`);
    }
    public static getPoints(userID: string): Promise<UserPoints> {
        return AxiosAPI.get(`${BASE_URLS.SERVER}/userPoints?userID=${userID}`);
    }
}
