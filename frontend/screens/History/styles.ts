import { StyleSheet } from "react-native";
import { theme } from "../../common/styling/theme";
import { FONT, SIZE } from './../../common/styling/variables';


export const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: SIZE.MEDIUM,
        backgroundColor:"white"
    },
    screenTitleContainer: {
        marginVertical: SIZE.MEDIUM
    },
    screenTitle: {
        color: theme.mainGreen,
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        textAlign: "center",
        fontWeight: "bold",
    }
})
