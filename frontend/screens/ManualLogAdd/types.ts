import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BirdlyUserData } from "../../api/AuthService/types";
import { RootStackParamList } from "../types";

export type Props = NativeStackScreenProps<RootStackParamList, 'ManualLogAdd'>;

export interface IManualLogAddProps {
    user: BirdlyUserData
}

export type ManualAddData = {
    englishName: string;
}