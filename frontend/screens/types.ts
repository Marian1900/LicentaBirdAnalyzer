import { IAccountScreenProps } from "./Account/types";
import { IAdminDashboardProps } from "./AdminDashboard/types";
import { IHistoryScreenProps } from "./History/types";
import { IHomeScreenProps } from "./Home/types";
import { ILoginScreenProps } from "./Login/types";
import { IManualLogAddProps } from "./ManualLogAdd/types";
import { IRegisterScreenProps } from "./Register/types";


export type RootStackParamList = {
    Login: ILoginScreenProps,
    Register: IRegisterScreenProps,
    Home: IHomeScreenProps,
    Account: IAccountScreenProps,
    History: IHistoryScreenProps,
    AdminDashboard: IAdminDashboardProps,
    ManualLogAdd: IManualLogAddProps,
    Statistics:
};

export type UserLocation = {
    latitude: number;
    longitude: number;
    altitude: number;
}

export type MapMarkers = {
    location: UserLocation,
    birdName: string,
    timestamp: number,
}

export { };

