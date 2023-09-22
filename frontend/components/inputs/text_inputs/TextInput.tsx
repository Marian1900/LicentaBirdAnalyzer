import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

import { TextInputProps } from "./types";

import { INPUT_STYLES } from "../../../common/styling/inputs";
import { TEXT_STYLES } from "../../../common/styling/texts";
import { theme } from "../../../common/styling/theme";
import { styles } from "./styles";

const CustomTextInput: React.FC<TextInputProps> = (props) => {
    return <View
        {...props.containerProps}
        style={styles.container}>
        <TextInput
            {...props.baseProps}
            mode="outlined"
            error={!!props.customProps?.errorMessage}
            style={INPUT_STYLES.TEXT_INPUT}
            activeOutlineColor={theme.mainGreen}
            outlineColor={theme.mainGreen} />
        <Text style={TEXT_STYLES.ERROR_TEXT}>
            {props.customProps?.errorMessage}
        </Text>
    </View>
}

export default CustomTextInput;