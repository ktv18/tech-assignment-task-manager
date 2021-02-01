import { useEffect } from 'react';

const useComponentDidMount = (cb) => {
  useEffect(() => {
    cb();
  }, ['']); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useComponentDidMount;
