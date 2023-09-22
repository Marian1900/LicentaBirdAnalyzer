import { StyleSheet } from "react-native";
import { theme } from "../../common/styling/theme";
import { FONT, SIZE } from "../../common/styling/variables";


export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: SIZE.MEDIUM,
        backgroundColor: "white"

    },
    titleTextContainer: {
        width: "100%",
    },
    titleText: {
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        color: theme.mainGreen,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: SIZE.MEDIUM,

    },
    greetingTextContainer: {
        width: "100%",
    },
    greetingText: {
        marginTop: SIZE.MEDIUM,
        fontSize: FONT.SIZE.MEDIUM,
    },
    menuContainer: {
        flex: 1,
        marginTop: SIZE.MEDIUM,
    },
    menuItemContainer: {
        width: "100%",
        padding: SIZE.SMALL,
        borderWidth: 1,
        borderColor: theme.mainGreen,
        borderRadius: SIZE.SMALL,
        marginTop: SIZE.MEDIUM,
    },
    menuItemText: {
        fontWeight: "bold",
        fontSize: FONT.SIZE.SMALL_MEDIUM,
    }
})
