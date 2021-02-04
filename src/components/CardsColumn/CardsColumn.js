import React from 'react';
import classNames from 'classnames';
import styles from './CardsColumn.module.css';
import DraggableCard from '../DraggableCard';
import AddCard from '../AddCard';
import EditableText from '../EditableText';

const CardsColumn = (props) => {
  const { className, title = '', cards = [], onCardAdd = () => {}, isOver, onCardUpdate } = props;

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
      <EditableText className={styles.title} value={title.toUpperCase()} />
      <div className={classNames(styles.cardsContainer, isOver && styles.active)}>
        {cards.map(renderCard)}
      </div>
      <AddCard className={styles.addCard} onCardAdd={onCardAdd} />
    </div>
  );
};

export default CardsColumn;
