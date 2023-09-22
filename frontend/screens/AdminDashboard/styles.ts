import { StyleSheet } from "react-native";
import { theme } from "../../common/styling/theme";
import { FONT, SIZE } from "../../common/styling/variables";


export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: SIZE.MEDIUM,
        backgroundColor: "white"

    },
    screenContent: {
        width: "100%",
        paddingVertical: SIZE.MEDIUM
    },
    titleText: {
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        color: theme.mainGreen,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: SIZE.MEDIUM,

    },
    titleTextContainer: {
        width: "100%",
    },
    menuItemContainer: {
        width: "100%",
        padding: SIZE.SMALL,
        borderWidth: 1,
        borderColor: theme.mainGreen,
        borderRadius: SIZE.SMALL,
        marginTop: SIZE.MEDIUM,
        flexDirection: "row",
        height: 50,
    },
    menuItemText: {
        fontWeight: "bold",
        fontSize: FONT.SIZE.SMALL_MEDIUM,
        marginRight: SIZE.MEDIUM,
    }
})
