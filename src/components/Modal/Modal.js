import React from 'react';
import ModalPackage from 'react-modal';
import classNames from 'classnames';
import styles from './Modal.module.css';

ModalPackage.setAppElement('#root');

const Modal = (props) => {
  const { show, onClose, className, children = null } = props;
  return (
    <ModalPackage
      isOpen={show}
      onRequestClose={onClose}
      className={classNames(styles.modal, className)}
      overlayClassName={styles.overlay}
    >
      {children}
    </ModalPackage>
  );
};

export default Modal;
