import React from 'react';
import Dropdown from '../Dropdown';
import classNames from 'classnames';
import styles from './LabelsDropdown.module.css';
import { renderIf } from '../../utils/rendererUtils';

const normalizeOption = (item) => ({
  value: item.id,
  label: item.label,
  ...item,
});

const LabelsDropdown = (props) => {
  const { className, labels, selectedValues, onChange } = props;
  console.log('labels', labels);

  return (
    <Dropdown
      className={className}
      options={labels.map(normalizeOption)}
      selectedValues={selectedValues}
      placeholder='Search labels...'
      title='LABELS'
      renderOptionWrapper={(props) => {
        const { children, className, ...rest } = props;
        return (
          <div className={classNames([styles.optionWrapper, className])} {...rest}>
            {children}
          </div>
        );
      }}
      renderOption={(props) => (
        <div className={styles.option} style={{ backgroundColor: props.color }}>
          <div className={styles.optionCover} />
          <span className={styles.label}>{props.label}</span>
          {renderIf(Boolean(props.selected))(<span className={styles.tick}>✓</span>)}
        </div>
      )}
      activeOptionClassName={styles.activeOption}
      onChange={onChange}
    />
  );
};

export default LabelsDropdown;
