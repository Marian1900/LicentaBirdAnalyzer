import AxiosAPI from "../AxiosApi";
import { BASE_URLS } from "../constants";
import { BirdLogAddData, BirdLogGetData, Specie } from "./types";

export class LogService {

    public static getLogs(userID: string): Promise<BirdLogGetData[]> {
        return AxiosAPI.get(`${BASE_URLS.SERVER}/BirdLog/userLogs?userID=${userID}`);
    }

    public static getAllLogs(): Promise<BirdLogGetData[]> {
        return AxiosAPI.get(`${BASE_URLS.SERVER}/BirdLog/allLogs`);
    }

    public static addLog(data: BirdLogAddData): Promise<void> {
        return AxiosAPI.post(`${BASE_URLS.SERVER}/BirdLog/add`, data);
    }

    public static deleteLog(id: string): Promise<void> {
        return AxiosAPI.delete(`${BASE_URLS.SERVER}/BirdLog/delete/?logID=${id}`);
    }

    public static getSpecies(): Promise<Specie[]> {
        return AxiosAPI.get(`${BASE_URLS.SERVER}/species`);
    }

}
