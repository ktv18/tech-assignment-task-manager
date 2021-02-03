import React from 'react';
import { useDnD } from './hooks';
import Card from '../Card';

const DraggableCard = (props) => {
  const { dragProps, cardProps } = props;
  const { id, index, status, moveItem } = dragProps;

  const { ref, isDragging } = useDnD({
    cardDetails: {
      status,
      id,
      index,
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
