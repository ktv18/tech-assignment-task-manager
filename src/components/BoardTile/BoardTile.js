import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './BoardTile.module.css';
import Button from '../Button';
import DeleteButton from '../DeleteButton';
import PopOver from '../PopOver';
import { renderIf } from '../../utils/rendererUtils';

const BoardTile = (props) => {
  const { title, className, onClick, onBoardUpdate, onBoardDelete } = props;
  const [showPopOver, setShowPopOver] = useState(false);
  const [titleField, setTitleField] = useState(title);
  const handleDotsClick = (e) => {
    e.stopPropagation();
    setShowPopOver(true);
  };

  useEffect(() => {
    setTitleField(title);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Boolean(title.trim()) === false) {
      return alert('Title can not be empty');
    }
    onBoardUpdate(titleField);

    setShowPopOver(false);
  };

  const handleChange = (e) => {
    setTitleField(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={classNames(styles.boardTile, className)} onClick={onClick}>
        <Button className={styles.dots} onClick={handleDotsClick}>
          <div />
          <div />
          <div />
        </Button>

        <span>{title}</span>
      </div>
      {renderIf(showPopOver)(
        <PopOver className={styles.popOver} onClose={() => setShowPopOver(false)}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              placeholder='write the title'
              value={titleField}
              type={'text'}
              onChange={handleChange}
            />
            <br />
            <div className={styles.buttons}>
              <Button type='submit'>Update</Button>
              <DeleteButton type='button' className={styles.delete} onClick={onBoardDelete}>
                delete
              </DeleteButton>
            </div>
          </form>
        </PopOver>,
      )}
    </div>
  );
};

export default BoardTile;
