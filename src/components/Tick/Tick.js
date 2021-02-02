import React from 'react';
import classNames from 'classnames';
import styles from './Tick.module.css';

const Tick = (props) => {
  const { className } = props;
  return <span className={classNames(styles.tick, className)}>✓</span>;
};

export default Tick;
