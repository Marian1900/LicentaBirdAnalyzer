import { Audio } from 'expo-av';

export async function startRecording(): Promise<Audio.Recording | undefined> {
    try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        return recording;
    } catch (err) {
        return undefined;
    }
}

export async function stopRecording(recording: Audio.Recording): Promise<string | null> {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    return uri;
}

export const downloadFile = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};