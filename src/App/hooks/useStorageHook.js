import { useEffect } from 'react';
import { saveToStorage } from '../../utils/common';
import { boardsEntity, usersEntity } from '../../constants';

const useStorageHook = (args) => {
  const { users, boards } = args;
  useEffect(() => {
    saveToStorage(usersEntity, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(boardsEntity, boards);
  }, [boards]);
};

export default useStorageHook;
