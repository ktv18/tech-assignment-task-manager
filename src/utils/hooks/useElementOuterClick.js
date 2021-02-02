import { useEffect } from 'react';

const useElementOuterClick = (args) => {
  const { elementRef, onOuterClick, shouldHandle = true } = args;

  useEffect(() => {
    if (shouldHandle === false) return;

    const handleDocumentClick = (e) => {
      if (elementRef.current === null) return;
      const { target } = e;
      const isOuterClick = target !== elementRef.current && !elementRef.current.contains(target);
      if (isOuterClick) {
        onOuterClick();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [elementRef, onOuterClick, shouldHandle]);
};

export default useElementOuterClick;
