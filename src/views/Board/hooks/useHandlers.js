import { useState } from 'react';
import { generateRandomId } from '../../../utils/common';

const selectTaskProps = ({ id, usersIds, title, colId, index }) => ({
  id,
  usersIds,
  title,
  colId,
  index,
});

const useHandlers = (args) => {
  const { initialColumns, initialTasks } = args;
  const [columns, setColumns] = useState(initialColumns || []);
  const [tasks, setTasks] = useState(initialTasks || []);

  const handleDrop = (task, colId) => {
    setTasks((prevState) =>
      prevState.filter((i) => i.id !== task.id).concat(selectTaskProps({ ...task, colId })),
    );
  };

  const handleMoveItem = (dragIndex, hoverIndex) => {
    const item = tasks[dragIndex];
    setTasks((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const handleColumnAdd = ({ title }) => {
    const newBoard = {
      title,
      id: generateRandomId(),
    };
    setColumns((prevState) => [...prevState, newBoard]);
  };

  const handleColumnUpdate = ({ title, id }) => {
    const columnIdxToUpdate = columns.findIndex((board) => board.id === id);
    columns[columnIdxToUpdate].title = title;
    setColumns([...columns]);
  };

  const handleColumnDelete = (id) => {
    setColumns((prevState) => prevState.filter((col) => col.id !== id));
  };

  const handleTaskUpdate = (task) => {
    const taskIdxToUpdate = tasks.findIndex(({ id }) => id === task.id);
    tasks[taskIdxToUpdate] = task;
    setTasks([...tasks]);
  };

  const handleCardAdd = (colId) => ({ title }) => {
    const newTask = {
      id: generateRandomId(),
      title,
      usersIds: [],
      index: tasks.length,
      colId: colId,
    };
    setTasks([...tasks, newTask]);
  };

  const checkDrop = (index) => (task) => {
    const targetColIdx = columns.findIndex(({ id }) => id === task.colId);
    return [index + 1, index - 1, index].includes(targetColIdx);
  };

  return {
    state: {
      columns,
      tasks,
    },
    handleTaskUpdate,
    handleColumnDelete,
    handleColumnUpdate,
    handleColumnAdd,
    handleMoveItem,
    handleDrop,
    checkDrop,
    handleCardAdd,
  };
};
export default useHandlers;
