import React from 'react';
import classNames from 'classnames';
import styles from './AddColumn.module.css';
import AddNewEntity from '../AddNewEntity';

const AddColumn = (props) => {
  const { className, onColumnAdd = () => {}, addColumnButtonClassName } = props;

  return (
    <AddNewEntity
      inputType='input'
      className={classNames(styles.addCard, className)}
      addEntityButtonClassName={addColumnButtonClassName}
      addEntityButtonLabel={'Add Another Column'}
      submitEntityButtonLabel='Add Column'
      onEntityAdd={onColumnAdd}
    />
  );
};

export default AddColumn;
