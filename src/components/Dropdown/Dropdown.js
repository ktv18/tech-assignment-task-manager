import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';
import { useHandlers } from './hooks';
import useComponentDidMount from '../../utils/hooks/useComponentDidMount';
import { renderIf } from '../../utils/rendererUtils';
import Tick from '../Tick';

const Dropdown = (props) => {
  const {
    className,
    activeOptionClassName = styles.active,
    selectedOptionClassName = styles.selected,
    placeholder = 'search something',
    title = 'some test title',
    options = [],
    renderOptionWrapper,
    renderOption = ({ label }) => label,
    selectedValues = [],
    onChange = (val) => console.log(val),
    inputFocusOnMount = false,
  } = props;

  const inputRef = useRef(null);

  useComponentDidMount(() => inputFocusOnMount && inputRef.current?.focus());

  const getOptionClassName = ({ active, selected }) =>
    classNames([
      styles.option,
      active && activeOptionClassName,
      selected && selectedOptionClassName,
    ]);

  const {
    state,
    handleInputChange,
    handleKeyDown,
    handleOptionClick,
    handleOptionMouseOver,
  } = useHandlers({ options, selectedValues, onChange, inputRef });

  const renderOptionItem = (args) => {
    const { value, active, selected } = args;

    const wrapperPartialProps = {
      className: getOptionClassName({ active, selected }),
      onMouseOver: () => handleOptionMouseOver({ value }),
      onClick: () => handleOptionClick({ value }),
    };

    if (renderOptionWrapper) {
      return renderOptionWrapper({
        ...args,
        ...wrapperPartialProps,
        children: renderOption(args),
      });
    }

    return (
      <div {...wrapperPartialProps} key={value}>
        {renderOption(args)}
        {renderIf(Boolean(selected))(<Tick className={styles.tick} />)}
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
      <div className={styles.optionsContainer}>{state.optionsToShow.map(renderOptionItem)}</div>
    </div>
  );
};

export default Dropdown;
