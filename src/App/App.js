import React, { useEffect } from 'react';
import styles from './App.module.css';
import Board from '../views/Board/Board';
import ManageUsersModal from '../components/ManageUsersModal';
import CreateBoard from '../components/CreateBoard';
import Button from '../components/Button';
import BoardTile from '../components/BoardTile';
import { renderIf } from '../utils/rendererUtils';
import { readFromStorage, saveToStorage } from '../utils/common';
import { boardsEntity, usersEntity, tasksEntity, columnsEntity } from '../constants';
import GlobalStateContext from '../GlobalStateContext';
import { useHandlers, useStorageHook } from './hooks';

const allTasks = readFromStorage(tasksEntity);
const allColumns = readFromStorage(columnsEntity);

function App() {
  const {
    state,
    handleBackHomeClick,
    handleUserCreate,
    handleDeleteUser,
    handleBoardUpdate,
    handleBoardDelete,
    handleBoardCreate,
    handleUserUpdate,
    handleBoardClick,
  } = useHandlers({
    initialUsers: readFromStorage(usersEntity),
    initialBoards: readFromStorage(boardsEntity),
  });

  const { users, boards, currentBoardId } = state;

  useStorageHook({ users, boards });

  return (
    <div className={styles.app}>
      <GlobalStateContext.Provider value={{ users }}>
        <div>
          {renderIf(currentBoardId)(<Button onClick={handleBackHomeClick}>Back Home</Button>)}
          <ManageUsersModal
            onUserDelete={handleDeleteUser}
            onUserCreate={handleUserCreate}
            onUserUpdate={handleUserUpdate}
            users={users}
          />
        </div>

        {currentBoardId === null ? (
          <>
            <CreateBoard className={styles.createBoard} onBoardCreate={handleBoardCreate} />
            <div className={styles.boardsTiles}>
              {boards.map(({ title, id }) => (
                <BoardTile
                  title={title}
                  onBoardDelete={() => handleBoardDelete(id)}
                  onBoardUpdate={handleBoardUpdate(id)}
                  onClick={() => handleBoardClick(id)}
                />
              ))}
            </div>
          </>
        ) : (
          <Board
            initialTasks={allTasks && allTasks[currentBoardId]}
            initialColumns={allColumns && allColumns[currentBoardId]}
            users={users}
            onColumnsSave={(cols) => saveToStorage(columnsEntity, { [currentBoardId]: cols })}
            onTasksSave={(tasks) => saveToStorage(tasksEntity, { [currentBoardId]: tasks })}
          />
        )}
      </GlobalStateContext.Provider>
    </div>
  );
}

export default App;
