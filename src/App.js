import React, { useState } from 'react';
import './App.css';
import Demo from './views/Demo/Demo';
import Board from './views/Board/Board';
import ManageUsersModal from './components/ManageUsersModal';
import { generateRandomId } from './utils/common';

function App() {
  const [users, setUsers] = useState([]);
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((user) => user.id !== id));
  };
  const handleUserCreate = (user) => {
    console.log('user', user);
    setUsers((prevState) => [
      ...prevState,
      {
        id: generateRandomId(),
        ...user,
      },
    ]);
  };

  const handleUserUpdate = (user) => {
    const userIdxToUpdate = users.findIndex(({ id }) => id === user.id);
    users[userIdxToUpdate] = user;
    setUsers([...users]);
  };

  return (
    <>
      <ManageUsersModal
        onUserDelete={handleDeleteUser}
        onUserCreate={handleUserCreate}
        onUserUpdate={handleUserUpdate}
        users={users}
      />
      <Board />
      <Demo />
    </>
  );
}

export default App;
