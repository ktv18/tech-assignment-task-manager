export const throttle = (func, limit) => {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generateRandomId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const runIf = (condition) => (functionToRun) => (...args) => {
  if (condition) {
    return functionToRun(...args);
  }
};

export const usersObjToArr = (users) => Object.keys(users).map((key) => users[key]);
