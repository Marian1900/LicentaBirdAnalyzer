import { StyleSheet } from "react-native";
import { theme } from "../../common/styling/theme";
import { FONT, SIZE } from './../../common/styling/variables';


export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: SIZE.MEDIUM,
        backgroundColor: "white"
    },
    titleText: {
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        color: theme.mainGreen,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: SIZE.MEDIUM,

    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: SIZE.MEDIUM,
        marginTop: SIZE.SMALL,
    },
    contentContainerLeft: {
        width: "45%",
        backgroundColor: "white"
    },
    contentContainerRight: {
        width: "45%",
        paddingTop: SIZE.MEDIUM,
        paddingLeft: SIZE.MEDIUM,
        backgroundColor: "white"
    },
    upperContentContainer: {
        marginTop: SIZE.MEDIUM
    },
    subtitleText: {
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        fontWeight: "bold",
    },
    numbersContainer: {
        marginLeft: SIZE.MEDIUM
    },
    veryCommonText: {
        color: "#737373",
        fontSize: FONT.SIZE.MEDIUM,
    },
    commonText: {
        color: "#65a30d",
        fontSize: FONT.SIZE.MEDIUM,
    },
    rareText: {
        color: "#1d4ed8",
        fontSize: FONT.SIZE.MEDIUM,
    },
    veryRareText: {
        color: "#ea580c",
        fontSize: FONT.SIZE.MEDIUM,
    },
    pointsText: {
        color: "#f59e0b",
        fontWeight: "bold",
        fontSize: SIZE.MEDIUM,
    },
    totalNumberContainer: {
        borderTopColor: "gray",
        marginTop: SIZE.EXTRA_SMALL
    },
    totalNumberText: {
        fontWeight: "bold",
        fontSize: FONT.SIZE.MEDIUM,
    },
    achievementsWrapper: {
        marginTop: SIZE.MEDIUM,
        backgroundColor: "white",
        paddingBottom: SIZE.SMALL,
        paddingHorizontal: SIZE.SMALL,
        maxHeight: "50%"
    },
    achievementContainer: {
        borderWidth: 1,
        borderColor: theme.mainGreen,
        marginTop: SIZE.SMALL,
        justifyContent: "center",
        borderRadius: SIZE.MEDIUM
    },
    achievementTitleText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    achievementDescriptionContainer: {

    },
    achievementDescriptionText: {
        textAlign: "center"
    }
})
