import { StyleSheet } from "react-native";

import { theme } from "../../common/styling/theme";
import { BORDER, DEFAULT_SHADOW, SIZE } from "../../common/styling/variables";

export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    upperContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomBar: {
        ...DEFAULT_SHADOW,
        justifyContent: "space-evenly",
        backgroundColor: "white",
        borderTopWidth: BORDER.SMALL,
        borderColor: theme.lightGray
    },
    microphoneButton: {
        backgroundColor: "white",
    },
    stateTextContainer: {
        marginTop: SIZE.MEDIUM,
        flexDirection: "row",
        alignItems: "center"
    },
    stateLoadingIndicator: {
        marginLeft: SIZE.SMALL
    }
})
