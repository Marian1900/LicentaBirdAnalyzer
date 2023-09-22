import { StyleSheet } from "react-native";
import { theme } from "../../../common/styling/theme";
import { SIZE } from "../../../common/styling/variables";


export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: SIZE.SMALL,
        borderRadius: SIZE.SMALL,
        borderWidth: 1,
        paddingHorizontal: SIZE.EXTRA_SMALL,
        backgroundColor: "#ebeff7",

    },
    upperContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZE.EXTRA_SMALL,
    },
    dateText: {
        fontWeight: "bold",
    },
    deleteIcon: {
        height: SIZE.MEDIUM,
        width: SIZE.MEDIUM,
        margin: 0,
        borderRadius: 0,
    },
    leftContainer: {
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: SIZE.EXTRA_SMALL,
    },
    possibilityTextContainer: {
        justifyContent: "center"
    },
    possibilityText: {
        color: theme.darkBlue,
        fontWeight: "bold",
        textAlignVertical: "center",
    }
})
