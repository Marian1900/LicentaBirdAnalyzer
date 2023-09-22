import AxiosAPI from "../AxiosApi";
import { BASE_URLS } from "../constants";
import { BirdlyUserData, LoginData, RegisterData } from "./types";

export class AuthenticationService {

    public static serverHealthCheck() {
        return AxiosAPI.get(`http://192.168.1.111:3001`);
    }

    public static login(loginData: LoginData): Promise<BirdlyUserData> {
        console.log(`${BASE_URLS.SERVER}/login`);
        return AxiosAPI.post(`${BASE_URLS.SERVER}/login`, loginData);
    }

    public static register(registerData: RegisterData): Promise<string> {
        console.log(`${BASE_URLS.SERVER}/register`, registerData);
        return AxiosAPI.post(`${BASE_URLS.SERVER}/register`, registerData);
    }
}
