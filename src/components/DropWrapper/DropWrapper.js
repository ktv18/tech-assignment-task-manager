import React from 'react';
import { useDnD } from './hooks';

const DropWrapper = (props) => {
  const { onDrop, children, onCanDrop, colId } = props;

  const { ref, isOver } = useDnD({
    onDrop: (item) => onDrop(item, colId),
    canDrop: (item) => onCanDrop(item),
  });

  return <div ref={ref}>{React.cloneElement(children, { isOver })}</div>;
};

export default DropWrapper;
