import React from 'react';
import classNames from 'classnames';
import styles from './Option.module.css';
import Tick from '../../../Tick';
import { renderIf } from '../../../../utils/rendererUtils';

const Option = (props) => {
  const { className, active, ...rest } = props;
  return (
    <div
      className={classNames([styles.optionWrapper, active && styles.activeOption, className])}
      {...rest}
    >
      <div className={styles.option} style={{ backgroundColor: props.color }}>
        <div className={styles.optionCover} />
        <span className={styles.label}>{props.label}</span>
        {renderIf(Boolean(props.selected))(<Tick className={styles.tick} />)}
      </div>
    </div>
  );
};

export default Option;
