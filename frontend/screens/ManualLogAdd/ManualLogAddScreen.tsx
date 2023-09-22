import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";


import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogService } from "../../api/LogService/LogService";
import { BirdLogAddData, Specie } from "../../api/LogService/types";
import { getDataForBirdLog } from "../../api/helpers/resultsHelper";
import { TEXT_STYLES } from "../../common/styling/texts";
import { theme } from "../../common/styling/theme";
import { toasts } from "../../common/toasts";
import { promiseWrapper } from "../../common/utils/promiseWrapper";
import { styles } from "./styles";
import { Props } from "./types";

const ManualLogAddScreen: React.FC<Props> = ({ navigation, route }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [isAddingLog, setIsAddingLog] = useState<boolean>(false);
    const [latinDropdownOpen, setLatinDropdownOpen] = useState<boolean>(false);
    const [englishDropdownOpen, setEnglishDropdownOpen] = useState<boolean>(false);
    const [latinName, setLatinName] = useState<string | null>(null);
    const [englishName, setEnglishName] = useState<string | null>(null);
    const [latinItems, setLatinItems] = useState<ItemType<ValueType>[]>([]);
    const [englishItems, setEnglishItems] = useState<ItemType<ValueType>[]>([]);
    const [species, setSpecies] = useState<Specie[]>([]);
    const [dropdownError, setDropdownError] = useState("");
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        AsyncStorage.getItem("species").then((stringifiedSpecies) => {
            if (!stringifiedSpecies) return;
            const species = JSON.parse(stringifiedSpecies);
            setSpecies(species);
            setLatinItems(species.map((specie: Specie) => ({ value: specie.latinName, label: specie.latinName })));
            setEnglishItems(species.map((specie: Specie) => ({ value: specie.englishName, label: specie.englishName })));
            setLoading(false)
        })
    }, [])

    const onLogAddSubmit = async () => {
        if (!latinName || !englishName) {
            setDropdownError("Please select an item from one of the dropdowns");
            return;
        }
        setIsAddingLog(true)
        const data = await getDataForBirdLog();
        const logData: BirdLogAddData = {
            finding: { englishName: englishName || "", latinName: latinName || "", possibility: 100 },
            location: data.location,
            timestamp: Date.now(),
            userId: route.params.user._id
        }
        promiseWrapper(LogService.addLog(logData))
            .then(() => {
                toasts.AddSuccess();
            })
            .finally(() => {
                setIsAddingLog(false);
                setDropdownError("");
                setLatinName(null);
                setEnglishName(null)
            })
    }

    const handleEnglishChange = useMemo(
        () => (value: string | null) => {
            const newLatinValue = species.find(specie => specie.englishName === value)?.latinName;
            if (newLatinValue) {
                setLatinName(newLatinValue);
            }
        }
        , [species])

    const handleLatinChange = useMemo(
        () => (value: string | null) => {
            const newEnglishValue = species.find(specie => specie.latinName === value)?.englishName;
            if (newEnglishValue) {
                setEnglishName(newEnglishValue);
            }
        }
        , [species])

    if (loading) {
        return <ActivityIndicator color={theme.mainGreen} />
    }

    return <View style={[styles.screenContainer, { paddingTop: top }]}>
        <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>
                Add log
            </Text>
        </View>
        <View style={styles.contentContainer}>
            <DropDownPicker
                listItemLabelStyle={{ textTransform: "capitalize" }}
                textStyle={{ textTransform: "capitalize" }}
                style={styles.dropdownStyle}
                containerStyle={{ borderColor: theme.mainGreen }}
                dropDownContainerStyle={{ borderColor: theme.mainGreen }}
                open={englishDropdownOpen}
                value={englishName}
                items={englishItems as any}
                setOpen={setEnglishDropdownOpen}
                onChangeValue={handleEnglishChange}
                setValue={setEnglishName}
                setItems={setEnglishItems as any}
                placeholder="English name"
                listMode="MODAL"
            />
            <DropDownPicker
                listItemLabelStyle={{ textTransform: "capitalize" }}
                textStyle={{ textTransform: "capitalize" }}
                style={styles.dropdownStyle}
                containerStyle={{ borderColor: theme.mainGreen }}
                dropDownContainerStyle={{ borderColor: theme.mainGreen }}
                open={latinDropdownOpen}
                value={latinName}
                items={latinItems as any}
                setOpen={setLatinDropdownOpen}
                onChangeValue={handleLatinChange}
                setValue={setLatinName}
                placeholder="Latin name"
                setItems={setLatinItems as any}
                listMode="MODAL"
            />
            <Text style={[TEXT_STYLES.ERROR_TEXT, { zIndex: -1 }]}>
                {dropdownError}
            </Text>
            <Button
                style={styles.submitButton}
                loading={isAddingLog}
                onPress={onLogAddSubmit}
                buttonColor={theme.mainGreen}
                mode="contained">
                Add Log
            </Button>
        </View>
    </View>
}

export default ManualLogAddScreen;