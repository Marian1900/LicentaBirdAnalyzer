import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ActivityIndicator, Button, Dialog } from "react-native-paper";

import { Specie } from "../../../../api/LogService/types";
import { getSORLinkByID } from "../../../../common/helpers/links";
import { DIALOG_STYLES } from "../../../../common/styling/dialog";
import { TEXT_STYLES } from "../../../../common/styling/texts";
import { theme } from "../../../../common/styling/theme";
import { styles } from "./styles";
import { DualButtonDialogType } from "./types";

export const DualButtonDialog = (props: DualButtonDialogType) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [species, setSpecies] = useState<Specie[] | null>(null);

    const getSpecies = async () => JSON.parse(await AsyncStorage.getItem("species") || "null") as (Specie[] | null)

    useEffect(() => {
        getSpecies().then(setSpecies).finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <ActivityIndicator />
    }

    return <Dialog
        style={DIALOG_STYLES.CONTAINER}
        visible={props.visible}
        onDismiss={props.onDismiss}>
        <Dialog.Title style={DIALOG_STYLES.TITLE as any}>
            {props.title}
        </Dialog.Title>
        <View style={DIALOG_STYLES.BUTTONS_CONTAINER as (StyleProp<ViewStyle>)}>
            {
                props.content &&
                <View style={styles.resultsContainer}>
                    <View style={styles.resultsTitleRowContainer}>
                        <View style={styles.resultTitleContainer}>
                            <Text>
                                Latin Name
                            </Text>
                        </View>
                        <View style={styles.resultTitleContainer}>
                            <Text>
                                English Name
                            </Text>
                        </View>
                        <View style={styles.resultTitleContainer}>
                            <Text>
                                Probability
                            </Text>
                        </View>
                        <View style={styles.resultTitleContainer}>
                            <Text>
                                Rarity
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listContainer}>
                        {
                            props.content.map((result, index) => {
                                const possibleSpecie = species?.find(specie => specie.latinName === result.latinName.toLowerCase());
                                return <View key={result.latinName} style={styles.listItemWrapper}>
                                    <TouchableOpacity
                                        onPress={props.onIdentificationPress?.bind(null, result)}
                                        key={index}
                                        style={styles.listItemContainer}>
                                        <View style={[styles.resultTitleContainer]}>
                                            <Text style={styles.resultsText}>
                                                {result.latinName}
                                            </Text>
                                        </View>
                                        <View style={styles.resultTitleContainer}>
                                            <Text style={styles.resultsText}>
                                                {result.englishName}
                                            </Text>
                                        </View>
                                        <View style={styles.resultTitleContainer}>
                                            <Text style={styles.resultsText}>
                                                {`${result.possibility}%`}
                                            </Text>
                                        </View>
                                        <View style={styles.resultTitleContainer}>
                                            <Text style={styles.resultsText}>
                                                {possibleSpecie ? possibleSpecie.rarity : "unknown"}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        possibleSpecie &&
                                        <TouchableOpacity onPress={() => Linking.openURL(getSORLinkByID(parseInt(possibleSpecie.sorID)))}>
                                            <Text style={TEXT_STYLES.LINK}>
                                                Press here to read more details!
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            }
                            )
                        }
                    </View>
                </View>

            }
            {
                props.leftButton &&
                <Dialog.Actions style={{ width: "1%" }}>
                    <Button
                        textColor={theme.mainGreen}
                        onPress={props.leftButton.onPress}>
                        {
                            props.leftButton.title
                        }
                    </Button>
                </Dialog.Actions>
            }
            {
                props.rightButton &&
                <Dialog.Actions style={{ width: "50%" }}>
                    <Button
                        textColor={theme.mainGreen}
                        onPress={props.rightButton.onPress}>
                        {props.rightButton.title}
                    </Button>
                </Dialog.Actions>
            }
        </View>
    </Dialog>
}