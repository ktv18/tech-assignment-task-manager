import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './EditableText.module.css';

const EditableText = (props) => {
  const { value, onChange, type = 'text', placeholder, className } = props;
  const [mouseOvered, setMouseOvered] = useState(false);
  const ref = useRef(null);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      event.stopPropagation();
      ref.current.blur();
    }
  };
  const handleMouseOver = () => setMouseOvered(true);
  const handleMouseLeave = () => setMouseOvered(false);
  const handleChange = (e) => onChange(e.target.value);

  return (
    <input
      ref={ref}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => handleKeyDown(e, type)}
      type={type}
      className={classNames(styles.editable, mouseOvered && styles.hovered, className)}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default EditableText;
