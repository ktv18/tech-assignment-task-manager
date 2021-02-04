import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './views/Board/Board';
import ManageUsersModal from './components/ManageUsersModal';
import { generateRandomId } from './utils/common';
import GlobalStateContext from './GlobalStateContext';

const localStorageKey = 'task-manager';
const usersEntity = `${localStorageKey}-tasks`;
const tasksEntity = `${localStorageKey}-users`;
const columnsEntity = `${localStorageKey}-columns`;

const readFromStorage = (entityName) => {
  try {
    const res = localStorage.getItem(entityName);
    return res && JSON.parse(res);
  } catch (e) {
    return null;
  }
};

const saveToStorage = (entityName, data) => {
  localStorage.setItem(entityName, JSON.stringify(data));
};

function App() {
  const [users, setUsers] = useState(readFromStorage(usersEntity) || {});

  useEffect(() => {
    saveToStorage(usersEntity, users);
  }, [users]);

  const handleDeleteUser = (id) => {
    const nextUsers = { ...users };
    delete nextUsers[id];
    setUsers(nextUsers);
  };
  const handleUserCreate = (user) => {
    const newUserId = generateRandomId();
    setUsers((prevState) => ({
      ...prevState,
      [newUserId]: {
        id: newUserId,
        ...user,
      },
    }));
  };

  const handleUserUpdate = (user) => {
    setUsers({
      ...users,
      [user.id]: user,
    });
  };

  return (
    <GlobalStateContext.Provider value={{ users }}>
      <ManageUsersModal
        onUserDelete={handleDeleteUser}
        onUserCreate={handleUserCreate}
        onUserUpdate={handleUserUpdate}
        users={users}
      />
      <Board
        initialTasks={readFromStorage(tasksEntity)}
        initialColumns={readFromStorage(columnsEntity)}
        users={users}
        onColumnsSave={(cols) => saveToStorage(columnsEntity, cols)}
        onTasksSave={(tasks) => saveToStorage(tasksEntity, tasks)}
      />
    </GlobalStateContext.Provider>
  );
}

export default App;
