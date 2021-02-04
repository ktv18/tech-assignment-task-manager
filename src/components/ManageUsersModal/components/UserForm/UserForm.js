import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../../../Button';
import styles from './UserForm.module.css';

const getInitialState = (fields) =>
  fields.reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: {
        value: field.value,
        isRequired: field.isRequired,
      },
    };
  }, {});

const UserForm = (props) => {
  const { className, fields = [], onSubmit, onCancel } = props;
  const [state, setState] = useState(getInitialState(fields));

  const checkError = (name) =>
    state[name].isRequired && Boolean(state[name].value.trim()) === false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = !Object.keys(state).some(checkError);
    if (isFormValid) {
      const newUser = Object.keys(state).reduce(
        (acc, field) => ({
          ...acc,
          [field]: state[field].value,
        }),
        {},
      );
      return onSubmit(newUser);
    }
    alert('Please fill the fields');
  };

  const setFieldValue = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  const renderField = ({ name, placeholder }, index) => (
    <input
      className={classNames(styles.input, checkError(name) && styles.inputError)}
      placeholder={placeholder}
      key={index}
      value={state[name].value}
      onChange={(e) => {
        const value = e.target.value;
        setFieldValue(name, value);
      }}
    />
  );
  return (
    <form className={className} onSubmit={handleSubmit}>
      {fields.map(renderField)}
      <Button type='submit'>save</Button>
      <Button type='button' onClick={onCancel}>
        cancel
      </Button>
    </form>
  );
};

export default UserForm;
