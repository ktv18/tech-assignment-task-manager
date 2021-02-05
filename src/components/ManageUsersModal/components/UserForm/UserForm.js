import React, { useState } from 'react';
import classNames from 'classnames';
import { renderIf } from '../../../../utils/rendererUtils';
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
  const { className, fields = [], onSubmit, onCancel, title } = props;
  const [state, setState] = useState(getInitialState(fields));
  const [showValidationError, setShowValidationError] = useState(false);

  const checkError = (name) =>
    state[name].isRequired && Boolean(state[name].value.trim()) === false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowValidationError(true);
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
      className={classNames(
        styles.input,
        showValidationError && checkError(name) && styles.inputError,
      )}
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
      {renderIf(title)(<h3 className={styles.title}>{title}</h3>)}
      {fields.map(renderField)}
      <div className={styles.buttons}>
        <Button type='submit'>save</Button>
        <Button type='button' onClick={onCancel}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
