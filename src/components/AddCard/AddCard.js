import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './AddCard.module.css';
import useElementOuterClick from '../../utils/hooks/useElementOuterClick';
import Button from '../Button';
import { useHandlers } from './hooks';

const AddCard = (props) => {
  const { className, onCardAdd = () => {} } = props;
  const formRef = useRef(null);

  const {
    handleTitleChange,
    handleSubmit,
    handleExpanderClick,
    handleOuterClick,
    state,
  } = useHandlers({
    onCardAdd,
  });

  useElementOuterClick({
    shouldHandle: state.expanded,
    elementRef: formRef,
    onOuterClick: handleOuterClick,
  });

  const innerContent = state.expanded ? (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        placeholder='Enter a title for this card'
        rows={5}
        value={state.title}
        onChange={handleTitleChange}
      ></textarea>
      <div className={styles.formButtons}>
        <Button className={styles.button} type='submit'>
          Add Card
        </Button>
        <Button className={styles.closeButton} type='button' onClick={handleExpanderClick(false)}>
          X
        </Button>
      </div>
    </form>
  ) : (
    <Button className={styles.addCardButton} onClick={handleExpanderClick(true)}>
      <span className={styles.plus}>+</span> Add Card
    </Button>
  );

  return <div className={classNames(styles.addCard, className)}>{innerContent}</div>;
};

export default AddCard;
