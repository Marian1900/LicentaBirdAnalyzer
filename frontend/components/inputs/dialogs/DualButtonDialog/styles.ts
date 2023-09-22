import { StyleSheet } from "react-native";
import { SIZE } from './../../../../common/styling/variables';

export const styles = StyleSheet.create({
    resultsContainer: {
        width: "100%",
        padding: SIZE.SMALL,
    },
    resultsTitleRowContainer: {
        width: "100%",
        flexDirection: "row",
    },
    resultTitleContainer: {
        fontWeight: "900",
        width: "25%",
        padding: SIZE.EXTRA_SMALL,
    },
    resultsText: {
        textAlign: "center",
    },
    listContainer: {
    },
    listItemWrapper: {
        borderTopWidth: 1,
        marginTop: SIZE.EXTRA_SMALL,
        borderColor: "gray"
    },
    listItemContainer: {
        flexDirection: "row",
    }
})