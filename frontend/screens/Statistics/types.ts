import { Achievement, UserPoints } from "../../api/PointsService/types";

export interface IStatisticsScreenProps {
}

export type AccountStats = {
    points: UserPoints;
    achievements: Achievement[];
}