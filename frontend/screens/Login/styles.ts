import { StyleSheet } from "react-native"

import { FONT, SIZE } from './../../common/styling/variables';
import { theme } from '../../common/styling/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.accentBlue,
        padding: "5%"
    },
    loginContainer: {
        padding: SIZE.MEDIUM,
        borderRadius: SIZE.EXTRA_SMALL,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    titleMain: {
        fontSize: FONT.SIZE.MEDIUM_LARGE,
        fontWeight: "bold",
        marginBottom: SIZE.MEDIUM,
    },
    titleSecondary: {
        color: theme.mainGreen,
    },
    loginText: {
        fontSize: FONT.SIZE.MEDIUM
    },
    registerTextContainer: {
        marginTop: SIZE.SMALL,
    },
    registerText: {
        fontSize: FONT.SIZE.MEDIUM,
        fontWeight: "bold",
    }
})
