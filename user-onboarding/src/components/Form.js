import React from 'react';

export default function Form(props) {
  const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props;

  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  }
  const onChange = evt => {
    const { name, value, checked, type } = evt.target;
    console.log(evt.target.value);
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>
        <button disabled={disabled}>Submit</button>
        <div className='errors'>
          <div>{errors.first_name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.serviceTerms}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>User Information</h4>
        <label>First Name:&nbsp;
          <input
            value={values.first_name}
            onChange={onChange}
            name='first_name'
            type='text'
          />
        </label>

        <label>Last Name:&nbsp;
          <input
            value={values.last_name}
            onChange={onChange}
            name='last_name'
            type='text'
          />
        </label>

        <label>Email:&nbsp;
          <input
            value={values.email}
            onChange={onChange}
            name='email'
            type='email'
          />
        </label>

        <label>Password:&nbsp;
          <input
            value={values.password}
            onChange={onChange}
            name='password'
            type='text'
          />
        </label>
      </div>

      <div className='form-group checkboxes'>
        <label>Check this box to agree to the Terms of Service:&nbsp;
          <input
            type='checkbox'
            name='serviceTerms'
            checked={values.serviceTerms}
            onChange={onChange}
          />
        </label>
      </div>
    </form>
  )
}