import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Surface } from "react-native-paper";

import { loginValidationSchema } from "../../common/schemas/schemas";
import CustomTextInput from "../../components/inputs/text_inputs/TextInput";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationService } from '../../api/AuthService/AuthenticationService';
import { BirdlyUserData, LoginData } from '../../api/AuthService/types';
import { promiseWrapper } from "../../common/utils/promiseWrapper";

import { theme } from "../../common/styling/theme";
import { RootStackParamList } from "../types";
import { styles } from "./styles";

const initialFormValues = {
    email: "",
    password: ""
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const [isLogging, setIsLogging] = useState<boolean>(false);

    const onRegisterTextPress = () => {
        navigation.navigate("Register", {});
    }

    const handleLogin = (loginData: LoginData) => {
        setIsLogging(true);
        promiseWrapper(AuthenticationService.login(loginData),
            (user: BirdlyUserData) => {
                navigation.navigate("Home", { user });
                AsyncStorage.setItem("user", JSON.stringify(user))
                setIsLogging(false);
            },
            () => {
                setIsLogging(false);
            }).catch(() => { });
    }

    return <View
        style={styles.container}>
        <Surface style={styles.loginContainer}>
            <Text style={styles.titleMain}>
                Welcome to Bird.log!
            </Text>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={loginValidationSchema}
                initialValues={initialFormValues}
                onSubmit={handleLogin} >
                {({ errors, handleSubmit, handleChange, values }) => (
                    <>
                        <CustomTextInput
                            baseProps={{
                                label: "Email",
                                onChangeText: handleChange("email"),
                                value: values.email
                            }}
                            customProps={{
                                errorMessage: errors.email
                            }} />
                        <CustomTextInput
                            baseProps={{
                                label: "Password",
                                onChangeText: handleChange("password"),
                                value: values.password,
                                secureTextEntry: true,
                            }}
                            customProps={{
                                errorMessage: errors.password
                            }} />
                        <Button
                            loading={isLogging}
                            onPress={() => handleSubmit()}
                            buttonColor={theme.mainGreen}
                            mode="contained">
                            Login
                        </Button>
                    </>
                )}
            </Formik>
            <TouchableOpacity
                onPress={onRegisterTextPress}
                style={styles.registerTextContainer}>
                <Text style={styles.registerText}>
                    No Account? Press here to register
                </Text>
            </TouchableOpacity>
        </Surface>
    </View>
}

export default LoginScreen;
