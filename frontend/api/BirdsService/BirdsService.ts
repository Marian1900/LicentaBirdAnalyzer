import * as FileSystem from 'expo-file-system';

import AxiosAPI from "../AxiosApi";
import { BASE_URLS } from '../constants';
import { RecordingResponse } from "./types";

export class BirdsService {

    public static serverHealthCheck() {
        console.log(`${BASE_URLS.BIRDS_NET}/healthcheck`);
        return AxiosAPI.get(`${BASE_URLS.BIRDS_NET}/healthcheck`);
    }

    public static async sendRecording(uri: string, fileName: string, extension: string): Promise<RecordingResponse | undefined> {

        const options: FileSystem.ReadingOptions = { encoding: FileSystem.EncodingType.Base64 };
        const fileContentBase64 = await FileSystem.readAsStringAsync(uri, options);
        const data = {
            base64Data: fileContentBase64,
            fileName,
            extension: `.${extension}`,
        };

        console.log({ ...data, base64Data: data.base64Data.slice(0, 100) });

        return AxiosAPI.post(`${BASE_URLS.BIRDS_NET}/analyze`, data)
    }
}
