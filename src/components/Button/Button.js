import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = (props) => {
  const { className = '', children, ...rest } = props;

  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
