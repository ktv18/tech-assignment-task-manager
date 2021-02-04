import { useEffect } from 'react';

const useStorageHook = (args) => {
  const { tasks, columns, onTasksSave, onColumnsSave } = args;

  useEffect(() => {
    onTasksSave(tasks);
  }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onColumnsSave(columns);
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useStorageHook;
