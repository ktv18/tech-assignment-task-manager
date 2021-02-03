import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
import UserAvatar from '../UserAvatar';

const Card = (props) => {
  const { title, className, users = [] } = props;

  const renderUser = (user) => <UserAvatar key={user.id} {...{ user }} className={styles.user} />;

  return (
    <div className={classNames(styles.card, className)}>
      <span>{title}</span>
      <div className={styles.users}>{users.map(renderUser)}</div>
    </div>
  );
};

export default Card;
