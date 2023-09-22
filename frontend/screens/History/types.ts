import { MapMarkers } from "../types";

export interface IHistoryScreenProps {
}

export type MapOptions =
    { show: false, markers: null } |
    { show: true, markers: MapMarkers[], region?: { latitude: number, longitude: number } }