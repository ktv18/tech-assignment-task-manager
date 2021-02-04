export const keyMap = {
  ENTER: 13,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  TAB: 9,
};

export const LABELS_COLORS = {
  '#61bd4f': '#61bd4f',
  '#f2d600': '#f2d600',
  '#ff9f1a': '#ff9f1a',
  '#eb5a46': '#eb5a46',
  '#c377e0': '#c377e0',
};

export const ITEM_TYPE = 'ITEM_TYPE';

export const localStorageKey = 'task-manager';
export const boardsEntity = `${localStorageKey}-boards`;
export const usersEntity = `${localStorageKey}-tasks`;
export const tasksEntity = `${localStorageKey}-users`;
export const columnsEntity = `${localStorageKey}-columns`;

const constants = {
  keyMap,
  LABELS_COLORS,
  ITEM_TYPE,
  boardsEntity,
  usersEntity,
  tasksEntity,
  columnsEntity,
};

export default constants;
