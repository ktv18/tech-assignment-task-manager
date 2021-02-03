import { useDrop } from 'react-dnd';
import { ITEM_TYPE } from '../../../constants';

const useDnD = (args) => {
  const { onDrop, canDrop } = args;
  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, colId) => canDrop(item),
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return {
    ref: dropRef,
    isOver,
  };
};

export default useDnD;
