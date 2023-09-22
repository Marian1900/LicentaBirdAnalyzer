import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const toasts = {
    ErrorAnalysis: () => Toast.show({
        type: "error",
        text1: "Error during analysis."
    }),
    DeleteSuccess: () => Toast.show({
        type: "success",
        text1: "Deleted successfully!"
    }),
    AddSuccess: () => Toast.show({
        type: "success",
        text1: "Log added successfully!"
    }),
    GeneralError: () => Toast.show({
        type: "error",
        text1: "Something went wrong"
    })
}