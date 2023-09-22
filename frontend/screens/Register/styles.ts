import { StyleSheet } from "react-native"

import { SIZE } from './../../common/styling/variables';
import { theme } from '../../common/styling/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.accentBlue,
        padding: "5%"
    },
    registerContainer: {
        padding: SIZE.MEDIUM,
        borderRadius: SIZE.EXTRA_SMALL,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
})
