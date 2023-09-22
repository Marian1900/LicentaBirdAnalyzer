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
    contentContainer: {
        flex: 1,
        marginTop: SIZE.MEDIUM,
        justifyContent: "center"
    },
    submitButton: {
        marginTop: SIZE.EXTRA_SMALL,
        zIndex: -1
    },
    dropdownStyle: {
        borderColor: theme.mainGreen,
        borderRadius: 4,
        marginTop: SIZE.MEDIUM,
    }
})
