import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';
import { useHandlers } from './hooks';
import useComponentDidMount from '../../utils/hooks/useComponentDidMount';
import { renderIf } from '../../utils/rendererUtils';

const getOptionClassName = ({ active, selected }) =>
  classNames([styles.option, active && styles.active, selected && styles.selected]);

const Dropdown = (props) => {
  const {
    className,
    placeholder = 'search something',
    title = 'some test title',
    options = [],
    renderOption = ({ label }) => label,
    selectedValues = [],
    onChange = (val) => console.log(val),
  } = props;
  const inputRef = useRef(null);

  useComponentDidMount(() => inputRef.current?.focus());

  const {
    state,
    handleInputChange,
    handleKeyDown,
    handleOptionClick,
    handleOptionMouseOver,
  } = useHandlers({ options, selectedValues, onChange, inputRef });

  const defaultRenderOption = (args) => {
    const { value, active, selected } = args;
    return (
      <div
        className={getOptionClassName({ active, selected })}
        key={value}
        onMouseOver={() => handleOptionMouseOver({ value })}
        onClick={() => handleOptionClick({ value })}
      >
        {renderOption(args)}
        {renderIf(Boolean(selected))(<div className={styles.tick}>✓</div>)}
      </div>
    );
  };

  return (
    <div className={classNames([styles.dropdown, className])}>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder={placeholder}
        type='text'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.optionsTitle}>{title}</div>
      <div className={styles.optionsContainer}>{state.optionsToShow.map(defaultRenderOption)}</div>
    </div>
  );
};

export default Dropdown;
