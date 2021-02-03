import React from 'react';
import { useDnD } from './hooks';
import { ITEM_TYPE } from '../../constants';
import { statuses } from '../../mocks';

const DropWrapper = (props) => {
  const { onDrop, children, status } = props;

  const { ref, isOver } = useDnD({
    onDrop: (item) => onDrop(item, status),
    canDrop: (item) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
  });

  return <div ref={ref}>{React.cloneElement(children, { isOver })}</div>;
};

export default DropWrapper;
