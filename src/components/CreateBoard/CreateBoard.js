import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './CreateBoard.module.css';
import Button from '../Button';
import PopOver from '../PopOver';
import { renderIf } from '../../utils/rendererUtils';

const CreateBoard = (props) => {
  const { onBoardCreate, className } = props;
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Boolean(title.trim()) === false) {
      return alert('Please add the title');
    }
    onBoardCreate(title);

    setShowForm(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={classNames(styles.container, className)} onClick={() => setShowForm(true)}>
      Create New Board
      {renderIf(showForm)(
        <PopOver className={styles.popOver} onClose={() => setShowForm(false)}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder='write the title' type={'text'} onChange={handleChange} />
            <br />
            <Button>Create</Button>
          </form>
        </PopOver>,
      )}
    </div>
  );
};

export default CreateBoard;
