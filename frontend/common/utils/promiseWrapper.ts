import Toast from 'react-native-toast-message';

export function promiseWrapper<T>(promise: Promise<T>, onSuccess?: Function, onError?: Function) {
    return new Promise((resolve, reject) => {
        promise.then((result) => {
            onSuccess?.(result);
            resolve(result);
        }).catch((error: string) => {
            Toast.show({
                type: 'error',
                text1: error,
            });
            reject(error);
            if (!onError) return;
            onError(error);
        });
    });
}