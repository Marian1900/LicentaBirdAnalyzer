import { ViewProps } from "react-native";
import { TextInput } from "react-native-paper";

type BaseTextInputProps = typeof TextInput.defaultProps

type CustomTextInputProps = {
    errorMessage?: string,
}

export type TextInputProps = {
    baseProps?: BaseTextInputProps,
    customProps?: CustomTextInputProps,
    containerProps?: ViewProps,
};