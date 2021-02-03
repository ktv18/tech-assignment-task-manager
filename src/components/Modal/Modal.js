import React from 'react';
import ModalPackage from 'react-modal';
import styles from './Modal.module.css';

ModalPackage.setAppElement('#root');

const Modal = (props) => {
  const { show, onClose, children = null } = props;
  return (
    <ModalPackage
      isOpen={show}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {children}
    </ModalPackage>
  );
};

export default Modal;
