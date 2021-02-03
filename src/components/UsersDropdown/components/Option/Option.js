import React from 'react';
import classNames from 'classnames';
import styles from './Option.module.css';
import UserAvatar from '../../../UserAvatar';

const getClassName = (className) => classNames([styles.option, className]);

const Option = (props) => {
  const { className, user } = props;

  return (
    <div className={getClassName(className)}>
      <UserAvatar user={user} />
      <div className={styles.nameDetails}>
        <span>{`${user.firstName} ${user.lastName}`}</span>
        <span className={styles.nickName}>{`(${user.nickName})`}</span>
      </div>
    </div>
  );
};

export default Option;
