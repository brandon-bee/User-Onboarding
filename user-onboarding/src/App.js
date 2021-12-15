import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import User from './components/User';
import schema from './validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  serviceTerms: false
};
const initialFormErrors = {
  first_name: '',
  email: '',
  password: '',
  serviceTerms: '',
};
const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(resp => {
        setUsers(resp.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(resp => {
        setUsers([ resp.data, ...users ]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setFormValues(initialFormValues))
  }
  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      serviceTerms: formValues.serviceTerms
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <h1>User Onboarding</h1>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      <h2>List of Users</h2>
      {
        users.map((user, idx) => {
          return (
            <User key={idx} details={user} />
          )
        })
      }
    </div>
  );
}