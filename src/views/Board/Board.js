import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './Board.module.css';
import DropWrapper from '../../components/DropWrapper';
import CardsColumn from '../../components/CardsColumn';
import AddColumn from '../../components/AddColumn';
import { generateRandomId } from '../../utils/common';

const selectTaskProps = ({ id, usersIds, title, colId, index }) => ({
  id,
  usersIds,
  title,
  colId,
  index,
});

const BoardPage = (props) => {
  const { users, initialTasks, initialColumns, onTasksSave, onColumnsSave } = props;
  const [columns, setColumns] = useState(initialColumns || []);
  const [tasks, setTasks] = useState(initialTasks || []);

  useEffect(() => {
    onTasksSave(tasks);
  }, [tasks]);

  useEffect(() => {
    onColumnsSave(columns);
  }, [columns]);

  const onDrop = (task, colId) => {
    console.log('task', task);
    setTasks((prevState) =>
      prevState.filter((i) => i.id !== task.id).concat(selectTaskProps({ ...task, colId })),
    );
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = tasks[dragIndex];
    setTasks((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const handleColumnAdd = ({ title }) => {
    const newBoard = {
      title,
      id: generateRandomId(),
    };
    setColumns((prevState) => [...prevState, newBoard]);
  };

  const handleTaskUpdate = (task) => {
    const taskIdxToUpdate = tasks.findIndex(({ id }) => id === task.id);
    tasks[taskIdxToUpdate] = task;
    setTasks([...tasks]);
  };
  console.log('tasks', tasks);
  return (
    <div className={styles.board}>
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
                    const newTask = {
                      id: generateRandomId(),
                      title,
                      usersIds: [],
                      index: tasks.length,
                      colId: col.id,
                    };
                    setTasks([...tasks, newTask]);
                  }}
                  onCardUpdate={(task) => handleTaskUpdate({ ...task, colId: col.id })}
                  cards={tasks
                    .filter((task) => task.colId === col.id)
                    .sort((prev, next) => prev.index - next.index)
                    .map((task, idx) => {
                      const cardUsers = task.usersIds.map((id) => users[id]).filter((user) => user);
                      return { ...task, users: cardUsers, index: idx, moveItem };
                    })}
                />
              </DropWrapper>
            );
          })}
          <AddColumn className={styles.addColumn} onColumnAdd={handleColumnAdd} />
        </div>
      </DndProvider>
    </div>
  );
};

export default BoardPage;
