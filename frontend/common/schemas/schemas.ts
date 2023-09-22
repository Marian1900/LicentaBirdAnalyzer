import * as yup from 'yup';

import { shapes } from "./yupShapes";

export const loginValidationSchema = yup.object().shape({
    email: shapes.email,
    password: shapes.password,
});

export const registerValidationSchema = yup.object({
    firstName: shapes.firstName,
    lastName: shapes.lastName,
    email: shapes.email,
    password: shapes.password,
    repeatPassword: shapes.repeatPassword
})

export const addManualLogValidationSchema = yup.object().shape({
    englishName: shapes.englishName,
});