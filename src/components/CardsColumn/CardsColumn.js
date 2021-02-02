import React from 'react';
import classNames from 'classnames';
import styles from './CardsColumn.module.css';
import Card from '../Card';
import AddCard from '../AddCard';

const CardsColumn = (props) => {
  const {
    className,
    title,
    cards = [],
    onCardAdd = ({ title }) => {
      alert(title);
    },
  } = props;

  const renderCard = ({ id, ...rest }) => <Card key={id} className={styles.card} {...rest} />;

  return (
    <div className={classNames(styles.cardsColumn, className)}>
      <span>{title}</span>
      {cards.map(renderCard)}
      <AddCard className={styles.addCard} onCardAdd={onCardAdd} />
    </div>
  );
};

export default CardsColumn;
