import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import styles from './DeleteButton.module.css';

const DeleteButton = (props) => {
  const { className = '', children = 'Delete', ...rest } = props;

  return (
    <Button className={classNames(styles.delete, className)} {...rest}>
      {children}
    </Button>
  );
};

export default DeleteButton;
