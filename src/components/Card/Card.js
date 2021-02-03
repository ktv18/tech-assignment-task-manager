import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
import { EditModal } from './components';
import UserAvatar from '../UserAvatar';

const Card = (props) => {
  const { title, className, users = [] } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const renderUser = (user) => <UserAvatar key={user.id} {...{ user }} className={styles.user} />;

  return (
    <>
      <div className={classNames(styles.card, className)} onClick={showModal}>
        <span>{title}</span>
        <div className={styles.users}>{users.map(renderUser)}</div>
      </div>
      <EditModal title={title} onClose={hideModal} show={modalVisible}>
        {users.map(renderUser)}
      </EditModal>
    </>
  );
};

export default Card;
