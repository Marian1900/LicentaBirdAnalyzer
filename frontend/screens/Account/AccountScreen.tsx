import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";


type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen: React.FC<Props> = ({ navigation, route }) => {

    const { top } = useSafeAreaInsets();

    const goToIdentificationHistoryScreen = () => {
        navigation.navigate("History", {})
    }

    const goToStatisticsScreen = () => {
        navigation.navigate("Statistics", {})
    }

    return <View style={[styles.screenContainer, { paddingTop: top }]}>
        <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>
                Account
            </Text>
        </View>
        <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>
                {`Hello, ${route.params.user.firstName} ${route.params.user.lastName}`}
            </Text>
        </View>
        <View style={styles.menuContainer}>
            <TouchableOpacity
                onPress={goToIdentificationHistoryScreen}
                style={styles.menuItemContainer}>
                <Text style={styles.menuItemText}>
                    Identification History
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={goToStatisticsScreen}
                style={styles.menuItemContainer}>
                <Text style={styles.menuItemText}>
                    Account statistics
                </Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default AccountScreen;