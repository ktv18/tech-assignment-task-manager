import React, { useState } from 'react';
import './App.css';
import Demo from './views/Demo/Demo';
import Board from './views/Board/Board';
import ManageUsersModal from './components/ManageUsersModal';
import { generateRandomId } from './utils/common';

function App() {
  const [users, setUsers] = useState([]);
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

  return (
    <>
      <ManageUsersModal onUserCreate={handleUserCreate} users={users} />
      <Board />
      <Demo />
    </>
  );
}

export default App;
