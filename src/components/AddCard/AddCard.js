import React from 'react';
import classNames from 'classnames';
import styles from './AddCard.module.css';
import AddNewEntity from '../AddNewEntity';

const AddCard = (props) => {
  const {
    className,
    onCardAdd = () => {},
    addCardButtonLabel = 'Add Another Card',

    addCardButtonClassName,
  } = props;

  return (
    <AddNewEntity
      className={classNames(styles.addCard, className)}
      addEntityButtonClassName={addCardButtonClassName}
      submitEntityButtonLabel='Add Card'
      addEntityButtonLabel={addCardButtonLabel}
      onEntityAdd={onCardAdd}
    />
  );
};

export default AddCard;
