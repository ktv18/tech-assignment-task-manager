import React from 'react';
import Dropdown from '../Dropdown';
import styles from './LabelsDropdown.module.css';
import Option from './components/Option';

const normalizeOption = (item) => ({
  value: item.id,
  label: item.label,
  ...item,
});

const LabelsDropdown = (props) => {
  const { className, labels, selectedValues, onChange } = props;

  return (
    <Dropdown
      className={className}
      options={labels.map(normalizeOption)}
      selectedValues={selectedValues}
      placeholder='Search labels...'
      title='LABELS'
      renderOptionWrapper={(props) => <Option key={props.id} {...props} />}
      activeOptionClassName={styles.activeOption}
      onChange={onChange}
    />
  );
};

export default LabelsDropdown;
