import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './AddNewEntity.module.css';
import useElementOuterClick from '../../utils/hooks/useElementOuterClick';
import Button from '../Button';
import { useHandlers } from './hooks';

const AddNewEntity = (props) => {
  const {
    className,
    onEntityAdd = () => {},
    inputType,
    addEntityButtonLabel = 'Add Another Entity',
    submitEntityButtonLabel = 'Add Entity',
    addEntityButtonClassName,
  } = props;
  const formRef = useRef(null);

  const {
    handleTitleChange,
    handleSubmit,
    handleExpanderClick,
    handleOuterClick,
    state,
  } = useHandlers({
    onEntityAdd,
  });

  useElementOuterClick({
    shouldHandle: state.expanded,
    elementRef: formRef,
    onOuterClick: handleOuterClick,
  });
  const inputPartialProps = {
    placeholder: 'Enter a title for this entity',
    value: state.title,
    onChange: handleTitleChange,
  };
  const innerContent = state.expanded ? (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      {inputType === 'input' ? (
        <input className={styles.input} type='text' {...inputPartialProps} />
      ) : (
        <textarea className={styles.textarea} rows={5} {...inputPartialProps}></textarea>
      )}

      <div className={styles.formButtons}>
        <Button className={styles.button} type='submit'>
          {submitEntityButtonLabel}
        </Button>
        <Button className={styles.closeButton} type='button' onClick={handleExpanderClick(false)}>
          X
        </Button>
      </div>
    </form>
  ) : (
    <Button
      className={classNames(styles.addEntityButton, addEntityButtonClassName)}
      onClick={handleExpanderClick(true)}
    >
      <span className={styles.plus}>+</span> {addEntityButtonLabel}
    </Button>
  );

  return <div className={classNames(styles.addEntity, className)}>{innerContent}</div>;
};

export default AddNewEntity;
