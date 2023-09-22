import * as yup from 'yup';

export const shapes = {
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is Required'),

    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),

    repeatPassword: yup
        .string()
        .test('passwords-match', 'Passwords must match', function (repeatPassword) {
            const password = this.parent.password;
            return !!password && repeatPassword
                ? password === repeatPassword
                : true
        }),

    firstName: yup.string()
        .required("Please enter first name")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),

    lastName: yup.string()
        .required("Please enter last name")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),

    latinName: yup.string()
        .required("Please enter latin name")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),

    englishName: yup.string()
        .required("Please enter english name")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),
}