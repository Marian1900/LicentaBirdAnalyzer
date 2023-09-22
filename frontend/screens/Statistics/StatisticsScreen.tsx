import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActivityIndicator, Surface } from "react-native-paper";
import { PointsService } from "../../api/PointsService/PointsService";
import { getUser } from "../../api/helpers/resultsHelper";
import { TEXT_STYLES } from "../../common/styling/texts";
import { theme } from "../../common/styling/theme";
import { toasts } from "../../common/toasts";
import { RootStackParamList } from "../types";
import { styles } from "./styles";
import { AccountStats } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const StatisticsScreen: React.FC<Props> = ({ navigation, route }) => {

    const [stats, setStats] = useState<AccountStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUser().then((data) => {
            if (!data) {
                toasts.GeneralError();
                return;
            }
            Promise
                .all([PointsService.getAchievements(data._id), PointsService.getPoints(data._id)])
                .then(responsesArray => {
                    setStats({
                        achievements: responsesArray[0],
                        points: responsesArray[1],
                    })
                })
                .finally(() => setLoading(false));
        })

    }, [])

    const { top } = useSafeAreaInsets();

    if (loading) {
        return <ActivityIndicator color={theme.mainGreen} />
    }
    if (!stats) {
        return <Text style={TEXT_STYLES.ERROR_TEXT}>
            Cannot load data
        </Text>
    }
    return <View style={[styles.screenContainer, { paddingTop: top }]}>
        <Text style={styles.titleText}>
            Stats
        </Text>
        <Surface style={styles.contentContainer}>
            <View style={styles.contentContainerLeft}>
                <View style={styles.upperContentContainer}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.subtitleText}>
                        Birds Identified:
                    </Text>
                    <View style={styles.numbersContainer}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.veryCommonText}>
                            {`Very common: ${stats.points.veryCommonNumber}`}
                        </Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.commonText}>
                            {`Common: ${stats.points.commonNumber}`}
                        </Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.rareText}>
                            {`Rare: ${stats.points.rareNumber}`}
                        </Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.veryRareText}>
                            {`Very rare: ${stats.points.veryRareNumber}`}
                        </Text>
                    </View>
                </View>
                <View style={styles.totalNumberContainer}>
                    <Text style={styles.totalNumberText}>
                        {`Total: ${stats.points.totalNumber}`}
                    </Text>
                </View>
            </View>
            <View style={styles.contentContainerRight}>
                <Text style={styles.subtitleText}>
                    Score
                </Text>
                <View>
                    <Text style={styles.pointsText}>
                        {`${stats.points.userPoints} Points`}
                    </Text>
                </View>
            </View>
        </Surface>
        <Surface style={styles.achievementsWrapper}>
            <ScrollView >
                {
                    stats.achievements.map((ach) =>
                        <View style={styles.achievementContainer}>
                            <Text style={styles.achievementTitleText}>
                                {
                                    ach.nameNormalized
                                }
                            </Text>
                            <View style={styles.achievementDescriptionContainer}>
                                <Text style={styles.achievementDescriptionText}>
                                    {
                                        ach.description
                                    }
                                </Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </Surface>
    </View>
}

export default StatisticsScreen;