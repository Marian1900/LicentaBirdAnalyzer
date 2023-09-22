import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogService } from "../../api/LogService/LogService";
import { getDataForBirdLog } from "../../api/helpers/resultsHelper";
import { getFormattedDate } from "../../common/helpers/dateHelpers";
import { theme } from "../../common/styling/theme";
import { MapOptions } from "../History/types";
import { initialMapOptions } from "../History/variables";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "AdminDashboard">;

const AdminDashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const [mapOptions, setMapOptions] = useState<MapOptions>(initialMapOptions);
  const [loadingMap, setLoadingMap] = useState<boolean>(false);

  const { top } = useSafeAreaInsets();

  const showLogAddScreen = () => {
    navigation.navigate("ManualLogAdd", { user: route.params.user });
  };

  const handleSeeAllPinsPress = () => {
    setLoadingMap(true);
    Promise.all([getDataForBirdLog(), LogService.getAllLogs()])
      .then((responses) => {
        setMapOptions({
          show: true,
          markers: responses[1].map((log) => ({
            location: log.location,
            birdName: log.finding.latinName,
            timestamp: log.timestamp,
          })),
          region: {
            latitude: responses[0].location.latitude,
            longitude: responses[0].location.longitude,
          },
        });
      })
      .finally(() => {
        setLoadingMap(false);
      });
  };

  if (mapOptions.show == true) {
    return (
      <MapView
        region={{
          latitude:
            mapOptions.region?.latitude ||
            mapOptions.markers[0].location.longitude,
          longitude:
            mapOptions.region?.longitude ||
            mapOptions.markers[0].location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.002,
        }}
        style={{ flex: 1 }}
      >
        {mapOptions.markers.map((finding, index) => (
          <Marker
            isPreselected
            pinColor={theme.mainGreen}
            title={finding.birdName}
            description={getFormattedDate(finding.timestamp)}
            key={index}
            coordinate={finding.location}
          />
        ))}
      </MapView>
    );
  }

  return (
    <View style={[styles.screenContainer, { paddingTop: top }]}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Admin Dashboard</Text>
      </View>
      <View style={styles.screenContent}>
        <TouchableOpacity
          onPress={showLogAddScreen}
          style={styles.menuItemContainer}
        >
          <Text style={styles.menuItemText}>Add log manually</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSeeAllPinsPress}
          style={styles.menuItemContainer}
        >
          <Text style={styles.menuItemText}>See all pins</Text>
          <ActivityIndicator
            size={20}
            color={theme.mainGreen}
            animating={loadingMap}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDashboardScreen;
