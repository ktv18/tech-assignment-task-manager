import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
import { EditModal } from './components';
import UserAvatar from '../UserAvatar';
import useModal from '../../utils/hooks/useModal';

const Card = (props) => {
  const { title, className, users = [], onCardUpdate } = props;

  const { modalVisible, showModal, hideModal } = useModal();

  const renderUser = (user) => <UserAvatar key={user.id} {...{ user }} className={styles.user} />;

  return (
    <>
      <div className={classNames(styles.card, className)} onClick={showModal}>
        <span>{title}</span>
        <div className={styles.users}>{users.map(renderUser)}</div>
      </div>
      <EditModal
        title={title}
        users={users}
        onClose={hideModal}
        show={modalVisible}
        onCardUpdate={onCardUpdate}
      ></EditModal>
    </>
  );
};

export default Card;
