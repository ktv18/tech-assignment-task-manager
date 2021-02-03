import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { throttle } from '../../../utils/common';
import { ITEM_TYPE } from '../../../constants';

const useDnD = (args) => {
  const { onCardSwap, cardDetails } = args;
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: throttle((item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragCardIndex = item.index;
      const hoverCardIndex = cardDetails.index;

      if (dragCardIndex === hoverCardIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const dragElementPosition = monitor.getSourceClientOffset();
      const hoverClientY = dragElementPosition.y - hoveredRect.top;

      if (dragCardIndex < hoverCardIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragCardIndex > hoverCardIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverCardIndex;
      onCardSwap(dragCardIndex, hoverCardIndex);
    }, 100),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE, ...cardDetails },
    isDragging: (monitor) => {
      return cardDetails.id === monitor.getItem().id;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return { ref, isDragging };
};

export default useDnD;
