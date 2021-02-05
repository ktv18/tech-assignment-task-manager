import React from 'react';
import Button from '../../../Button';
import styles from './UserTextRow.module.css';

const UserTextRow = (props) => {
  const { className, user, onEditClick, onDeleteClick } = props;

  const { avatarUrl, firstName, lastName, nickName } = user;

  return (
    <div key={props.id} className={className}>
      {[avatarUrl, firstName, lastName, nickName].map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <Button onClick={onEditClick}>edit</Button>
      <Button onClick={onDeleteClick} className={styles.delete}>
        delete
      </Button>
    </div>
  );
};

export default UserTextRow;
