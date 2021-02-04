import { generateRandomId } from '../../utils/common';
import React, { useState, useEffect } from 'react';

const useHandlers = (args) => {
  const { initialUsers, initialBoards } = args;
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [users, setUsers] = useState(initialUsers || {});
  const [boards, setBoards] = useState(initialBoards || []);

  const handleUserUpdate = (user) => {
    setUsers({
      ...users,
      [user.id]: user,
    });
  };

  const handleBoardCreate = (title) => {
    const newBoardId = generateRandomId();
    setBoards((prevState) => {
      return [...prevState, { title, id: newBoardId }];
    });
    setCurrentBoardId(newBoardId);
  };

  const handleBoardDelete = (id) => {
    setBoards((prevState) => {
      return prevState.filter((board) => board.id !== id);
    });
  };

  const handleBoardUpdate = (id) => (title) => {
    const boardIdxToUpdate = boards.findIndex((board) => board.id === id);
    boards[boardIdxToUpdate].title = title;
    setBoards([...boards]);
  };

  const handleBoardClick = (id) => setCurrentBoardId(id);

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

  const handleBackHomeClick = () => setCurrentBoardId(null);

  return {
    state: {
      users,
      boards,
      currentBoardId,
    },
    handleBackHomeClick,
    handleUserCreate,
    handleDeleteUser,
    handleBoardUpdate,
    handleBoardDelete,
    handleBoardCreate,
    handleUserUpdate,
    handleBoardClick,
  };
};

export default useHandlers;
