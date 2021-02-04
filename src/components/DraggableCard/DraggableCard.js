import React from 'react';
import { useDnD } from './hooks';
import Card from '../Card';

const DraggableCard = (props) => {
  const { dragProps, cardProps } = props;
  const { id, index, colId, moveItem, usersIds } = dragProps;

  const { ref, isDragging } = useDnD({
    cardDetails: {
      colId,
      id,
      index,
      usersIds,
      ...cardProps,
    },
    onCardSwap: moveItem,
  });

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1, zIndex: 999 }}>
      <Card {...cardProps} />
    </div>
  );
};

export default DraggableCard;
