import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Portal,
  Provider,
  Text,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BirdsService } from "../../api/BirdsService/BirdsService";
import { LogService } from "../../api/LogService/LogService";
import {
  convertBirdNetData,
  getDataForBirdLog,
} from "../../api/helpers/resultsHelper";
import { downloadFile } from "../../common/helpers/sound";
import { toasts } from "../../common/toasts";
import { DualButtonDialog } from "../../components/inputs/dialogs/DualButtonDialog/DualButtonDialog";
import { DualButtonDialogType } from "../../components/inputs/dialogs/DualButtonDialog/types";
import { RootStackParamList } from "../types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BirdLogFinding } from "../../api/LogService/types";
import { theme } from "../../common/styling/theme";
import { SIZE } from "../../common/styling/variables";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [audioRecording, setAudioRecording] = useState<Audio.Recording>();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DualButtonDialogType>({
    visible: false,
  });

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    getLocationPermission();
    LogService.getSpecies().then((species) => {
      AsyncStorage.setItem("species", JSON.stringify(species));
    });
  }, []);

  const hideDialog = () => setDialog({ visible: false });

  const healthCheck = () => {
    BirdsService.serverHealthCheck().then((a) => {});
  };

  async function startRecording() {
    hideDialog();
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      ).then((audio) => {
        setAudioRecording(audio.recording);
      });
    } catch (err) {}
  }

  async function stopRecording() {
    setIsRecording(false);
    setAudioRecording(undefined);
    await audioRecording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setIsAnalyzing(true);
    const uri = audioRecording?.getURI();
    if (!uri) return;
    const file = await downloadFile(uri);
    const [fileName, extension] = (file as any)._data.name.split(".");
    BirdsService.sendRecording(uri, fileName, extension)
      .then(
        async (response) => {
          if (!response || response.msg !== "success") {
            toasts.ErrorAnalysis();
            return;
          }
          const results: BirdLogFinding[] = convertBirdNetData(
            response.results
          );
          showSuccessIdentificationDialog(results);
          const data = await getDataForBirdLog();
          if (!data) return;
          const { user, location } = data;
          LogService.addLog({
            finding: results[0],
            userId: user._id,
            location,
            timestamp: Date.now(),
          });
        },
        () => toasts.ErrorAnalysis()
      )
      .finally(() => setIsAnalyzing(false));
  }

  const onUploadPress = async () => {
    const fileToUpload = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });
    hideDialog();
    if (fileToUpload.type === "success") {
      setIsAnalyzing(true);
      const [fileName, extension] = fileToUpload.name.split(".");
      BirdsService.sendRecording(fileToUpload.uri, fileName, extension)
        .then(
          async (response) => {
            if (!response || response.msg !== "success") {
              toasts.ErrorAnalysis();
              return;
            }
            const results: BirdLogFinding[] = convertBirdNetData(
              response.results.slice(0, 3)
            );
            showSuccessIdentificationDialog(results);
          },
          (error) => toasts.ErrorAnalysis()
        )
        .finally(() => {
          setIsAnalyzing(false);
        });
    }
  };

  const getHomePageMessage = () => {
    if (isRecording) {
      return "Recording...";
    }
    if (isAnalyzing) {
      return "Analyzing...";
    }
    return "Welcome To Bird.log!";
  };

  const showMainDialog = () => {
    setDialog({
      visible: true,
      title: "What do you want to do?",
      leftButton: {
        title: "Record",
        onPress: startRecording,
      },
      rightButton: {
        title: "Upload",
        onPress: onUploadPress,
      },
      onDismiss: hideDialog,
    });
  };

  const showSuccessIdentificationDialog = (content: BirdLogFinding[]) => {
    setDialog({
      visible: true,
      title: "Identification success! Select a bird or try again.",
      content,
      onDismiss: hideDialog,
    });
  };

  const getLocationPermission = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  };

  const handleAccountPress = () => {
    if (!route.params.user) return;
    navigation.navigate("Account", { user: route.params.user });
  };

  const handleAdminButtonPress = () => {
    if (!route.params.user) return;
    navigation.navigate("AdminDashboard", { user: route.params.user });
  };

  const handleIdentificationPress = async (finding: BirdLogFinding) => {
    hideDialog();
    const data = await getDataForBirdLog();
    if (!data) return;
    const { user, location } = data;
    LogService.addLog({
      finding: finding,
      userId: user._id,
      location,
      timestamp: Date.now(),
    }).then(() => toasts.AddSuccess());
  };

  return (
    <Provider>
      <Portal>
        <View style={styles.screenContainer}>
          <View style={styles.upperContainer}>
            <Text>{getHomePageMessage()}</Text>
            {(isAnalyzing || isRecording) && (
              <ActivityIndicator
                style={styles.stateLoadingIndicator}
                color={theme.mainGreen}
              />
            )}
          </View>
          <Appbar style={styles.bottomBar} safeAreaInsets={{ bottom }}>
            <Appbar.Action
              onPress={handleAccountPress}
              size={SIZE.MEDIUM}
              icon="account"
            />
            <Appbar.Action
              animated
              iconColor={audioRecording ? theme.dangerRed : theme.mainGreen}
              size={SIZE.EXTRA_LARGE}
              style={styles.microphoneButton}
              icon={audioRecording ? "record" : "plus-circle"}
              onPress={audioRecording ? stopRecording : showMainDialog}
            />
            {route.params.user && route.params.user.role === "admin" && (
              <Appbar.Action
                onPress={handleAdminButtonPress}
                size={SIZE.MEDIUM}
                icon="view-dashboard-outline"
              />
            )}
          </Appbar>
          {
            <DualButtonDialog
              onIdentificationPress={handleIdentificationPress}
              {...dialog}
            />
          }
        </View>
      </Portal>
    </Provider>
  );
};

export default HomeScreen;
