import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './CardsColumn.module.css';
import DraggableCard from '../DraggableCard';
import AddCard from '../AddCard';
import Button from '../Button';
import DeleteButton from '../DeleteButton';
import PopOver from '../PopOver';
import EditableText from '../EditableText';
import { renderIf } from '../../utils/rendererUtils';

const CardsColumn = (props) => {
  const {
    className,
    title = '',
    cards = [],
    onCardAdd = () => {},
    isOver,
    onCardUpdate,
    onTitleUpdate,
    onColumnDelete,
  } = props;

  const [showPopOver, setShowPopOver] = useState(false);

  const handleCardUpdate = (id) => (card) => onCardUpdate({ ...card, id });

  const renderCard = ({ title, className, users, ...dragProps }) => (
    <DraggableCard
      key={dragProps.id}
      cardProps={{
        title,
        className: styles.card,
        users,
        onCardUpdate: handleCardUpdate(dragProps.id),
      }}
      dragProps={dragProps}
    />
  );

  return (
    <div className={classNames(styles.cardsColumn, className)}>
      <div className={styles.dotsContainer}>
        <Button className={styles.dots} onClick={() => setShowPopOver(true)}>
          <div />
          <div />
          <div />
        </Button>
        {renderIf(showPopOver)(
          <PopOver className={styles.popOver} onClose={() => setShowPopOver(false)}>
            <DeleteButton className={styles.delete} onClick={onColumnDelete} />
          </PopOver>,
        )}
      </div>

      <EditableText className={styles.title} value={title.toUpperCase()} onChange={onTitleUpdate} />
      <div className={classNames(styles.cardsContainer, isOver && styles.active)}>
        {cards.map(renderCard)}
      </div>
      <AddCard className={styles.addCard} onCardAdd={onCardAdd} />
    </div>
  );
};

export default CardsColumn;
