import { useEffect, useState } from 'react';
import { saveToStorage, readFromStorage } from '../../utils/common';
import { boardsEntity, usersEntity, tasksEntity, columnsEntity } from '../../constants';

const allTasks = readFromStorage(tasksEntity);
const allColumns = readFromStorage(columnsEntity);

const useStorageHook = (args) => {
  const { users, boards, currentBoardId } = args;

  const [allTasksAndColumns, setAllTasksAndColumn] = useState({ allTasks, allColumns });

  useEffect(() => {
    saveToStorage(usersEntity, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(boardsEntity, boards);
  }, [boards]);

  useEffect(() => {
    const allTasks = readFromStorage(tasksEntity);
    const allColumns = readFromStorage(columnsEntity);
    setAllTasksAndColumn({ allTasks, allColumns });
  }, [currentBoardId, setAllTasksAndColumn]);

  return {
    ...allTasksAndColumns,
  };
};

export default useStorageHook;
