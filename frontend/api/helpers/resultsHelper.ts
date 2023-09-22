import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { UserLocation } from '../../screens/types';
import { BirdlyUserData } from '../AuthService/types';
import { BirdLogFinding } from './../LogService/types';

export const convertBirdNetData = (data: [string, number][]): BirdLogFinding[] => {
    return data.slice(0, 3).map(result => ({
        latinName: result[0].split("_")[0],
        englishName: result[0].split("_")[1],
        possibility: parseFloat((result[1] * 100).toFixed(4)),
    }))
}

export const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser) as BirdlyUserData
    return user;
}

export const getDataForBirdLog = async () => {
    const user = await getUser() as BirdlyUserData;
    const locData = (await Location.getCurrentPositionAsync()).coords;
    const location: UserLocation = { latitude: locData.latitude, longitude: locData.longitude, altitude: locData.altitude || 0 };
    return { user, location }
}