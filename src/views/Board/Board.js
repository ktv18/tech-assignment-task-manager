import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './Board.module.css';
import DropWrapper from '../../components/DropWrapper';
import CardsColumn from '../../components/CardsColumn';
import AddColumn from '../../components/AddColumn';
import { generateRandomId } from '../../utils/common';

const BoardPage = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const handleBoardAdd = ({ title }) => {
    const newBoard = {
      title,
      id: generateRandomId(),
    };
    setColumns((prevState) => [...prevState, newBoard]);
  };

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
                    const newCard = {
                      id: generateRandomId(),
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
          <div>
            <AddColumn onColumnAdd={handleBoardAdd} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default BoardPage;
