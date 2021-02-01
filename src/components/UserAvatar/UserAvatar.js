import React from 'react';
import classNames from 'classnames';
import styles from './UserAvatar.module.css';

const UserAvatar = (props) => {
  const { className, user } = props;
  const { avatarUrl, firstName = '', lastName = '' } = user;

  if (Boolean(avatarUrl) === false)
    return (
      <div className={classNames(styles.userAvatar, className)}>
        {firstName.charAt(0).toUpperCase()}
        {lastName.charAt(0).toUpperCase()}
      </div>
    );

  return (
    <img
      className={classNames(styles.userAvatar, className)}
      src={user.avatarUrl}
      alt={user.fullName}
    />
  );
};

export default UserAvatar;
