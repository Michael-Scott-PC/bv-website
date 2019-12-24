import * as yup from 'yup';

export default yup.object({
    identifier: yup
        .string()
        .email('Invalid email')
        .min(7, 'Email field is too short.')
        .max(40, 'Email field is too long.')
        .required('Required')
        ,
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        )
});