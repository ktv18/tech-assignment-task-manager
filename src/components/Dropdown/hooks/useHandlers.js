import { useState } from 'react';
import { keyMap } from '../../../constants';

const toLowerCase = (str) => str.toLowerCase();
const getFirstItem = (arr) => arr[0];
const getLastIdx = (arr) => arr.length - 1;

const useHandlers = (args) => {
  const { options, selectedValues, onChange, inputRef } = args;
  const [state, setState] = useState({
    activeValue: null,
    querySearch: '',
  });

  const optionsToShow = options
    .filter((option) => toLowerCase(option.label).includes(toLowerCase(state.querySearch)))
    .map((option) => ({
      ...option,
      active: state.activeValue === option.value,
      selected: selectedValues.includes(option.value),
    }));

  const setActiveValue = (activeValue) => {
    setState({
      ...state,
      activeValue,
    });
  };

  const handleDownArrow = () => {
    if (state.activeValue === null) {
      const nextActiveValue = getFirstItem(optionsToShow).value;
      return setActiveValue(nextActiveValue);
    }

    const currentActiveIdx = optionsToShow.findIndex(({ value }) => value === state.activeValue);

    if (currentActiveIdx + 1 === optionsToShow.length) {
      const nextActiveValue = getFirstItem(optionsToShow).value;
      return setActiveValue(nextActiveValue);
    }

    const nextActiveValue = optionsToShow[currentActiveIdx + 1].value;
    return setActiveValue(nextActiveValue);
  };

  const handleUpArrow = () => {
    if (state.activeId === null) {
      const nextActiveValue = optionsToShow[getLastIdx(optionsToShow)].value;
      return setActiveValue(nextActiveValue);
    }

    const currentActiveIdx = optionsToShow.findIndex(({ value }) => value === state.activeValue);

    if (currentActiveIdx - 1 < 0) {
      const nextActiveValue = optionsToShow[getLastIdx(optionsToShow)].value;
      return setActiveValue(nextActiveValue);
    }

    const nextActiveValue = optionsToShow[currentActiveIdx - 1].value;
    return setActiveValue(nextActiveValue);
  };
  const handleEnter = () => {
    const activeItem = optionsToShow.find(({ value }) => value === state.activeValue);
    onChange({ value: activeItem.value, selected: !activeItem.selected });
  };
  const handleInputChange = (e) => {
    setState({
      ...state,
      querySearch: e.target.value,
    });
  };
  const handleKeyDown = (e) => {
    if ([keyMap.DOWN_ARROW, keyMap.UP_ARROW, keyMap.ENTER].includes(e.keyCode)) {
      e.preventDefault();
      switch (e.keyCode) {
        case keyMap.DOWN_ARROW:
          handleDownArrow();
          break;
        case keyMap.UP_ARROW:
          handleUpArrow();
          break;
        case keyMap.ENTER:
          handleEnter();
          break;
        default:
          return false;
      }
    }
  };

  const handleOptionMouseOver = (option) => setActiveValue(option.value);

  const handleOptionClick = ({ value }) => {
    const clickedOption = optionsToShow.find((option) => option.value === value);
    onChange({
      value,
      selected: !clickedOption.selected,
    });
    inputRef.current?.focus();
  };

  return {
    state: {
      optionsToShow,
    },
    handleInputChange,
    handleKeyDown,
    handleOptionClick,
    handleOptionMouseOver,
  };
};

export default useHandlers;
