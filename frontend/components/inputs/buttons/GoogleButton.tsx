import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const GoogleButton: React.FC<{}> = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '136672063626-7ehcqheh66ro601eegtne6c3e3pt9vfg.apps.googleusercontent.com',
        iosClientId: '136672063626-7ehcqheh66ro601eegtne6c3e3pt9vfg.apps.googleusercontent.com',
        androidClientId: '136672063626-7ehcqheh66ro601eegtne6c3e3pt9vfg.apps.googleusercontent.com',
        webClientId: '136672063626-7ehcqheh66ro601eegtne6c3e3pt9vfg.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}

export default GoogleButton;