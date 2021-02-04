import React, { useContext, useState, useRef } from 'react';
import Modal from '../../../Modal';
import EditableText from '../../../EditableText';
import UserAvatar from '../../../UserAvatar';
import styles from './EditModal.module.css';
import GlobalContext from '../../../../GlobalStateContext';
import { usersObjToArr } from '../../../../utils/common';
import { renderIf } from '../../../../utils/rendererUtils';
import UsersDropdown from '../../../UsersDropdown';
import Button from '../../../Button';
import useElementOuterClick from '../../../../utils/hooks/useElementOuterClick';

const PopOver = (props) => {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
};

const EditModal = (props) => {
  const { show, onClose, title, onCardUpdate, users = [] } = props;
  const [showUsersPopOver, setUsersPopOver] = useState(false);
  const popOverRef = useRef(null);

  useElementOuterClick({
    shouldHandle: showUsersPopOver,
    elementRef: popOverRef,
    onOuterClick: () => setUsersPopOver(false),
  });

  const { users: globalUsers } = useContext(GlobalContext);

  const renderUser = (user) => (
    <UserAvatar key={user.id} {...{ user }} className={styles.userAvatar} />
  );
  const usersIds = users.map(({ id }) => id);
  const handleTitleChange = (title) => onCardUpdate({ title, usersIds });

  return (
    <Modal show={show} onClose={onClose}>
      <EditableText value={title} onChange={handleTitleChange} placeholder='Write a task title' />
      <h3>Users</h3>
      <div className={styles.users}>
        {users.map(renderUser)}
        <div className={styles.popOverWrapper}>
          <Button className={users.length > 0 && styles.plus} onClick={() => setUsersPopOver(true)}>
            {users.length > 0 ? '+' : 'Assign User'}
          </Button>
          {renderIf(showUsersPopOver)(
            <div ref={popOverRef} className={styles.popOverContainer}>
              <PopOver className={styles.popOver}>
                <UsersDropdown
                  users={usersObjToArr(globalUsers)}
                  selectedValues={usersIds}
                  onChange={({ value, selected }) => {
                    if (Boolean(selected) === false) {
                      const nextUsersIds = usersIds.filter((id) => id !== value);

                      return onCardUpdate({ title, usersIds: nextUsersIds });
                    }

                    const nextUsersIds = users.map(({ id }) => id);
                    onCardUpdate({ title, usersIds: [...nextUsersIds, value] });
                  }}
                />
              </PopOver>
            </div>,
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
