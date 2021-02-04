import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import UsersDropdown from '../UsersDropdown';
import useModal from '../../utils/hooks/useModal';
import styles from './ManageUsersModal.module.css';
import { UserForm, UserTextRow } from './components';
import { usersObjToArr } from '../../utils/common';
import { renderIf } from '../../utils/rendererUtils';

const fieldsConfig = [
  { name: 'avatarUrl', placeholder: 'paste user avatar url' },
  { name: 'firstName', placeholder: 'write user first name' },
  { name: 'lastName', placeholder: 'write user last name' },
  { name: 'nickName', placeholder: 'write user nick name' },
];

const getUserField = ({ name, value = '', placeholder = '' }) => ({
  name,
  placeholder,
  value,
  isRequired: name !== 'avatarUrl',
});

const ManageUsersModal = (props) => {
  const { onUserUpdate = () => {}, onUserCreate = () => {}, onUserDelete = () => {} } = props;

  const { modalVisible, showModal, hideModal } = useModal();
  const [formsIds, setFormsIds] = useState({});
  const [newUserMode, setNewUserMode] = useState(false);

  const users = usersObjToArr(props.users);
  console.log('users users users', users);

  const switchToForm = (id, value) =>
    setFormsIds((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });

  const renderForm = ({ key, onCancel, fields, onSubmit }) => (
    <UserForm key={key} className={styles.userOption} {...{ onCancel, fields, onSubmit }} />
  );

  const handleCreateUser = (user) => {
    onUserCreate(user);
    setNewUserMode(false);
  };

  const handleUserUpdate = (id, user) => {
    onUserUpdate({
      id,
      ...user,
    });
    switchToForm(id, false);
  };

  return (
    <>
      <Button onClick={showModal}>{'Manage Users'}</Button>
      <Modal className={styles.modal} show={modalVisible} onClose={hideModal}>
        <div className={styles.newUserSection}>
          {renderIf(newUserMode)(
            renderForm({
              key: '',
              onCancel: () => setNewUserMode(false),
              onSubmit: handleCreateUser,
              fields: fieldsConfig.map(getUserField),
            }),
          )}

          {renderIf(newUserMode === false)(
            <Button onClick={() => setNewUserMode(true)}>Add new User</Button>,
          )}
        </div>
        <UsersDropdown
          className={styles.dropdown}
          users={users}
          renderOptionWrapper={(props) => {
            if (Boolean(formsIds[props.id]) === false) {
              const { avatarUrl, firstName, lastName, nickName } = props;
              console.log('props', props);
              console.log('props.id', props.id);
              console.log('props.value', props.value);
              return (
                <UserTextRow
                  key={props.id}
                  className={styles.userOption}
                  user={{ avatarUrl, firstName, lastName, nickName }}
                  onEditClick={() => switchToForm(props.id, true)}
                  onDeleteClick={() => onUserDelete(props.id)}
                />
              );
            }

            const formFields = fieldsConfig
              .map(({ name, ...rest }) => ({
                name,
                value: props[name],
                ...rest,
              }))
              .map(getUserField);

            return renderForm({
              key: props.value,
              onCancel: () => switchToForm(props.id, false),
              onSubmit: (user) => handleUserUpdate(props.id, user),
              fields: formFields,
            });
          }}
        />
      </Modal>
    </>
  );
};

export default ManageUsersModal;
