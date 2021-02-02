import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
import UserAvatar from '../UserAvatar';

const Card = (props) => {
  const { title = 'Implement Card Component', className, users = [{}, {}, {}], ...rest } = props;

  const renderUser = (user, index) => <UserAvatar key={index} {...{ user }} />;

  return (
    <div className={classNames(styles.card, className)} {...rest}>
      <span>{title}</span>
      <div className={styles.users}>{users.map(renderUser)}</div>
    </div>
  );
};

export default Card;
