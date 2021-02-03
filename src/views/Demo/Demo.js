import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './Demo.module.css';
import DropWrapper from '../../components/DropWrapper';
import CardsColumn from '../../components/CardsColumn';
import Dropdown from '../../components/Dropdown';
import UsersDropdown from '../../components/UsersDropdown';
import LabelsDropdown from '../../components/LabelsDropdown';
import { users, labels, cards as cardsMock, statuses } from '../../mocks';

const Homepage = () => {
  const [items, setItems] = useState(cardsMock);
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  const [selectedLabelsIds, setSelectedLabelsIds] = useState(['#61bd4f0', '0']);

  const onDrop = (item, status) => {
    setItems((prevState) => {
      return [...prevState.filter((i) => i.id !== item.id).concat({ ...item, status })];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <>
      <h1>Columns Cards </h1>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.grid}>
          {statuses.map((s) => {
            return (
              <DropWrapper key={s.status} onDrop={onDrop} status={s.status}>
                <CardsColumn
                  title={s.status}
                  cards={items
                    .filter((i) => i.status === s.status)
                    .map((i, idx) => ({ ...i, index: idx, moveItem, status: s.status }))}
                />
              </DropWrapper>
            );
          })}
        </div>
      </DndProvider>
      <div>
        <LabelsDropdown
          labels={labels}
          selectedValues={selectedLabelsIds}
          onChange={({ value, selected }) => {
            if (Boolean(selected) === false) {
              return setSelectedLabelsIds(selectedLabelsIds.filter((id) => id !== value));
            }
            return setSelectedLabelsIds([...selectedLabelsIds, value]);
          }}
        />
        <UsersDropdown
          users={users}
          selectedValues={selectedUsersIds}
          onChange={({ value, selected }) => {
            if (Boolean(selected) === false) {
              return setSelectedUsersIds(selectedUsersIds.filter((id) => id !== value));
            }
            return setSelectedUsersIds([...selectedUsersIds, value]);
          }}
        />
        <Dropdown
          options={users.map((user) => ({
            value: user.id,
            label: user.fullName,
          }))}
          selectedValues={selectedUsersIds}
          onChange={({ value, selected }) => {
            if (Boolean(selected) === false) {
              return setSelectedUsersIds(selectedUsersIds.filter((id) => id !== value));
            }
            return setSelectedUsersIds([...selectedUsersIds, value]);
          }}
        />
      </div>
    </>
  );
};

export default Homepage;
