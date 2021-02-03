import React from 'react';
import Modal from '../../../Modal';
import EditableText from '../../../EditableText';
import styles from './EditModal.module.css';

const EditModal = (props) => {
  const { show, onClose, title, onTitleChange, users } = props;

  return (
    <Modal show={show} onClose={onClose}>
      <EditableText value={title} onChange={onTitleChange} placeholder='Write a task title' />
    </Modal>
  );
};

export default EditModal;
