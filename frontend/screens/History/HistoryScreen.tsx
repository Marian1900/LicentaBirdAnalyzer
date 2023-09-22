import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LogService } from "../../api/LogService/LogService";
import { BirdLogGetData } from "../../api/LogService/types";
import { getUser } from "../../api/helpers/resultsHelper";
import { promiseWrapper } from "../../common/utils/promiseWrapper";
import { RootStackParamList } from "../types";
import HistoryItem from "./HistoryItem/HistoryItem";

import { getFormattedDate } from "../../common/helpers/dateHelpers";
import { theme } from "../../common/styling/theme";
import { styles } from "./styles";
import { MapOptions } from "./types";
import { initialMapOptions } from "./variables";

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const HistoryScreen: React.FC<Props> = ({ navigation, route }) => {

    const [items, setItems] = useState<BirdLogGetData[] | null>(null);
    const [mapOptions, setMapOptions] = useState<MapOptions>(initialMapOptions);

    const { top } = useSafeAreaInsets();

    useEffect(() => {
        getUser().then((user) => {
            if (!user) return;
            promiseWrapper(LogService.getLogs(user._id)
                .then((response) => {
                    setItems(response);
                })
            )
        });
    }, []);

    useEffect(() => {
        const backAction = () => {
            mapOptions.show ? setMapOptions(initialMapOptions) : navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [mapOptions.show]);

    const handleItemPress = (item: BirdLogGetData) => {
        setMapOptions({
            show: true,
            markers: [{
                location: item.location,
                birdName: item.finding.latinName,
                timestamp: item.timestamp
            }],
        });
    }

    const handleItemDelete = (id: string) => {
        if (!items) return;
        setItems(items.filter(item => item._id !== id))
    }

    if (mapOptions.show == true) {
        console.log(mapOptions.markers[0].location)
        return <MapView
            region={{
                latitude: mapOptions.markers[0].location.latitude,
                longitude: mapOptions.markers[0].location.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.002,
            }}
            style={{ flex: 1 }} >
            {
                mapOptions.markers.map((finding, index) => (
                    <Marker
                        isPreselected
                        pinColor={theme.mainGreen}
                        title={finding.birdName}
                        description={getFormattedDate(finding.timestamp)}
                        key={index}
                        coordinate={finding.location}
                    />
                ))
            }
        </MapView>
    }

    return <View style={[styles.screenContainer, { paddingTop: top }]}>
        <View style={styles.screenTitleContainer}>
            <Text style={styles.screenTitle}>
                History
            </Text>
        </View>
        <ScrollView>
            {
                items
                    ? items.map(item =>
                        <HistoryItem
                            deleteItemCallback={handleItemDelete}
                            onItemPressCallback={handleItemPress}
                            key={item._id}
                            item={item} />)
                    : <ActivityIndicator color={theme.mainGreen} />
            }
        </ScrollView>
    </View>
}

export default HistoryScreen;