import * as yup from 'yup';

export default yup.object({
  first_name: yup
    .string()
    .min(2, 'First name field is too short')
    .max(30, 'First name field is too long')
    .required('Required'),
  last_name: yup
    .string()
    .min(2, 'Last name field is too short')
    .max(30, 'Last name field is too long')
    .required('Required'),
  email: yup
    .string()
    .email('Invalid email')
    .min(7, 'Email field is too short')
    .max(40, 'Email field is too long')
    .required('Required'),
  username: yup
    .string()
    .required('Please enter a username')
    .min(3, 'Username is too short. Must contain at least 3 characters.')
    .matches(
      /^(?=.*[a-z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_])/,
      'Username must contain at least one lowercase letter and it may contain only alphanumeric characters, numbers, and/or underscores.'
    ),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Password is too short. Must contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character.'
    ),
  password2: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Passwords must match.'
    )
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});
