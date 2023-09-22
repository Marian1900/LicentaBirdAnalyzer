
import AxiosAPI from "../AxiosApi";
import { BASE_URLS } from '../constants';
import { Specie } from "./types";

export class BirdsService {

    public static async getSpecies(): Promise<Specie> {

        return AxiosAPI.get(`${BASE_URLS.SERVER}/species`);
    }
}
