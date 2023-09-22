import { Formik } from 'formik';
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface } from "react-native-paper";

import { registerValidationSchema } from "../../common/schemas/schemas";
import CustomTextInput from "../../components/inputs/text_inputs/TextInput";
import { RootStackParamList } from "../types";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationService } from '../../api/AuthService/AuthenticationService';
import { RegisterData } from '../../api/AuthService/types';
import { theme } from "../../common/styling/theme";
import { promiseWrapper } from '../../common/utils/promiseWrapper';
import { styles } from "./styles";
import { RegisterFormData } from './types';

const initialFormValues: RegisterFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
}

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const registerHandler = (values: RegisterFormData) => {
        setIsRegistering(true);
        const registerData: RegisterData = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            role: "admin"
        }
        promiseWrapper(AuthenticationService.register(registerData),
            (userID: string) => {
                setIsRegistering(false);
                navigation.navigate("Login", {})
            }, () => {
                setIsRegistering(false);
            }).catch(() => { })
    }

    return <View
        style={styles.container}>
        <Surface style={styles.registerContainer}>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={registerValidationSchema}
                initialValues={initialFormValues}
                onSubmit={registerHandler} >
                {({ errors, handleSubmit, handleChange, values }) => (
                    <>
                        <CustomTextInput
                            baseProps={{
                                label: "First Name",
                                onChangeText: handleChange("firstName"),
                                value: values.firstName
                            }}
                            customProps={{
                                errorMessage: errors.firstName
                            }} />
                        <CustomTextInput
                            baseProps={{
                                label: "Last Name",
                                onChangeText: handleChange("lastName"),
                                value: values.lastName
                            }}
                            customProps={{
                                errorMessage: errors.lastName
                            }} />
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
                        <CustomTextInput
                            baseProps={{
                                label: "Repeat Password",
                                onChangeText: handleChange("repeatPassword"),
                                value: values.repeatPassword,
                                secureTextEntry: true,
                            }}
                            customProps={{
                                errorMessage: errors.repeatPassword
                            }} />
                        <Button
                            loading={isRegistering}
                            onPress={() => handleSubmit()}
                            buttonColor={theme.mainGreen}
                            mode="contained">
                            Register
                        </Button>
                    </>
                )}
            </Formik>
        </Surface>
    </View>
}

export default RegisterScreen;