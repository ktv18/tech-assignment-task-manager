import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './PopOver.module.css';
import useElementOuterClick from '../../utils/hooks/useElementOuterClick';

const PopOver = (props) => {
  const { children, className, onClose } = props;
  const ref = useRef(null);

  useElementOuterClick({
    shouldHandle: true,
    elementRef: ref,
    onOuterClick: onClose,
  });

  return (
    <div ref={ref} className={classNames(styles.popOver, className)}>
      {children}
    </div>
  );
};

export default PopOver;
