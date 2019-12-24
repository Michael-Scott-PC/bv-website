import * as yup from 'yup';

export default yup.object({
  first_name: yup
    .string()
    .min(2, 'First name field is too short.')
    .max(30, 'First name field is too long.')
    .required('Required'),
  last_name: yup
    .string()
    .min(2, 'Last name field is too short.')
    .max(30, 'Last name field is too long.')
    .required('Required'),
  email: yup
    .string()
    .email('Invalid email')
    .min(7, 'Email field is too short.')
    .max(40, 'Email field is too long.')
    .required('Required'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'The phone number must consist of only digits.')
    .min(10, 'Too short! The phone number needs to be 10 digits long.')
    .max(
      10,
      'Too many characters! The phone number needs to be 10 digits long.'
    ),
  question: yup
    .string()
    .min(10, 'The question field needs at least 10 characters.')
    .max(
      1000,
      'The question field has a max of 1,000 characters. If your question exceeds this, please email Brian: brian@aredetroit.com'
    )
    .required('Required')
});
