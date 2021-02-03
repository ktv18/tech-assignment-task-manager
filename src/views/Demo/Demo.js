import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './Demo.module.css';
import DropWrapper from '../../components/DropWrapper';
import CardsColumn from '../../components/CardsColumn';
import Dropdown from '../../components/Dropdown';
import UsersDropdown from '../../components/UsersDropdown';
import LabelsDropdown from '../../components/LabelsDropdown';
import AddCard from '../../components/AddCard';
import Card from '../../components/Card';
import {
  columns as columnsMock,
  tasks as tasksMock,
  labels as labelsMock,
  users as usersMock,
} from '../../mocksItems';

const DemoPage = () => {
  const [columns, setColumns] = useState(columnsMock);
  const [tasks, setTasks] = useState(tasksMock);
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  const [selectedLabelsIds, setSelectedLabelsIds] = useState(['#61bd4f0', '0']);

  const onDrop = (task, colId) => {
    setTasks((prevState) => {
      return [...prevState.filter((i) => i.id !== task.id).concat({ ...task, colId })];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = tasks[dragIndex];
    setTasks((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className={styles.demo}>
      <p>This is just a demo page to show some UI components</p>
      <h1>Draggable Columns Cards </h1>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.grid}>
          {columns.map((col, index) => {
            return (
              <DropWrapper
                key={col.id}
                colId={col.id}
                onCanDrop={(task) => {
                  const targetColIdx = columns.findIndex(({ id }) => id === task.colId);
                  return [index + 1, index - 1, index].includes(targetColIdx);
                }}
                onDrop={onDrop}
                status={col.title}
              >
                <CardsColumn
                  title={col.title}
                  onCardAdd={({ title }) => {
                    const newCard = {
                      title,
                      users: [],
                      colId: col.id,
                    };
                    setTasks([...tasks, newCard]);
                  }}
                  cards={tasks
                    .filter((task) => task.colId === col.id)
                    .map((task, idx) => ({ ...task, index: idx, moveItem }))}
                />
              </DropWrapper>
            );
          })}
        </div>
      </DndProvider>
      <br />
      <br />
      <br />
      <div>
        <h1>Card</h1>
        <Card title='test title' users={tasksMock[0].users} />
        <h1>AddCard</h1>
        <AddCard className={styles.addCard} onCardAdd={() => {}} />
        <h1>Labels Dropdown </h1>
        <LabelsDropdown
          labels={labelsMock}
          selectedValues={selectedLabelsIds}
          onChange={({ value, selected }) => {
            if (Boolean(selected) === false) {
              return setSelectedLabelsIds(selectedLabelsIds.filter((id) => id !== value));
            }
            return setSelectedLabelsIds([...selectedLabelsIds, value]);
          }}
        />
        <h1>Users Dropdown </h1>
        <UsersDropdown
          users={usersMock}
          selectedValues={selectedUsersIds}
          onChange={({ value, selected }) => {
            if (Boolean(selected) === false) {
              return setSelectedUsersIds(selectedUsersIds.filter((id) => id !== value));
            }
            return setSelectedUsersIds([...selectedUsersIds, value]);
          }}
        />
        <h1>Base Dropdown </h1>
        <Dropdown
          options={usersMock.map((user) => ({
            value: user.id,
            label: user.firstName + user.lastName,
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
    </div>
  );
};

export default DemoPage;
