import * as yup from 'yup';

const formSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required('First name is required'),
  last_name: yup
    .string()
    .trim(),
  email: yup
    .string()
    .email('Enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required'),
  serviceTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the Terms of Service')
})

export default formSchema;