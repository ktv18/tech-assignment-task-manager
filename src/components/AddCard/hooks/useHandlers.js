import { useState } from 'react';

const useHandlers = (args) => {
  const { onCardAdd } = args;

  const [title, setTitle] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleTitleChange = (e) => {
    const { target } = e;
    setTitle(target.value);
  };

  const handleCardAdd = () => {
    if (!title) return;
    onCardAdd({ title });
    return setTitle('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCardAdd();
  };

  const handleExpanderClick = (expanded) => () => setExpanded(expanded);
  const handleOuterClick = () => {
    handleCardAdd();
    setExpanded(false);
  };
  return {
    state: {
      title,
      expanded,
    },
    handleTitleChange,
    handleCardAdd,
    handleSubmit,
    handleExpanderClick,
    handleOuterClick,
  };
};

export default useHandlers;
