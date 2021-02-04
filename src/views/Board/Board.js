import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './Board.module.css';
import DropWrapper from '../../components/DropWrapper';
import CardsColumn from '../../components/CardsColumn';
import AddColumn from '../../components/AddColumn';
import { useHandlers, useStorageHook } from './hooks';

const BoardPage = (props) => {
  const { users, initialTasks, initialColumns, onTasksSave, onColumnsSave } = props;
  const {
    state,
    handleTaskUpdate,
    handleColumnDelete,
    handleColumnUpdate,
    handleColumnAdd,
    handleMoveItem,
    handleCardAdd,
    handleDrop,
    checkDrop,
  } = useHandlers({ initialColumns, initialTasks });

  const { columns, tasks } = state;

  useStorageHook({
    columns,
    tasks,
    onTasksSave,
    onColumnsSave,
  });

  return (
    <div className={styles.board}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.grid}>
          {columns.map((col, index) => {
            return (
              <DropWrapper
                key={col.id}
                colId={col.id}
                onCanDrop={checkDrop(index)}
                onDrop={handleDrop}
                status={col.title}
              >
                <CardsColumn
                  title={col.title}
                  onTitleUpdate={(title) => handleColumnUpdate({ title, id: col.id })}
                  onColumnDelete={() => handleColumnDelete(col.id)}
                  onCardAdd={handleCardAdd(col.id)}
                  onCardUpdate={(task) => handleTaskUpdate({ ...task, colId: col.id })}
                  cards={tasks
                    .filter((task) => task.colId === col.id)
                    .sort((prev, next) => prev.index - next.index)
                    .map((task, idx) => {
                      const cardUsers = task.usersIds.map((id) => users[id]).filter((user) => user);
                      return { ...task, users: cardUsers, index: idx, moveItem: handleMoveItem };
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
