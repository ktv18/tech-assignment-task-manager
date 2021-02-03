import { LABELS_COLORS } from './constants';
export const labels = [
  {
    id: '0',
    color: '#61bd4f',
    label: 'New label',
  },
  ...Object.keys(LABELS_COLORS).map((color, index) => ({
    id: color + index,
    color,
    label: '',
  })),
];

export const users = [
  {
    id: 0,
    avatarUrl: 'https://picsum.photos/40/40',
    fullName: 'Petro Developerko',
    firstName: 'Petro',
    lastName: 'Developerko',
    nickName: 'pet.dev',
  },

  {
    id: 1,
    fullName: 'Ivan Developerko',
    firstName: 'Ivan',
    lastName: 'Developerko',
    nickName: 'ivan.ivan',
  },
  {
    id: 44,
    avatarUrl: 'https://picsum.photos/40/40',
    fullName: 'Misha Devel',
    firstName: 'Misha',
    lastName: 'Devel',
    nickName: 'misha.ivan',
  },
  {
    id: 57,
    fullName: 'Vasyl vasyl',
    firstName: 'Vasyl',
    lastName: 'vasyl',
    nickName: 'vasyl.ivan',
  },
];

export const cards = [
  {
    id: 1,
    title: 'From "open"',
    status: 'open',
    users: [
      {
        id: 44,
        avatarUrl: 'https://picsum.photos/40/40',
        fullName: 'Misha Devel',
        firstName: 'Misha',
        lastName: 'Devel',
        nickName: 'misha.ivan',
      },
      {
        id: 57,
        fullName: 'Vasyl vasyl',
        firstName: 'Vasyl',
        lastName: 'vasyl',
        nickName: 'vasyl.ivan',
      },
    ],
  },
  {
    id: 2,
    status: 'open',
    title: 'random card',
    users: [
      {
        id: 44,
        avatarUrl: 'https://picsum.photos/40/40',
        fullName: 'Misha Devel',
        firstName: 'Misha',
        lastName: 'Devel',
        nickName: 'misha.ivan',
      },
      {
        id: 57,
        fullName: 'Vasyl vasyl',
        firstName: 'Vasyl',
        lastName: 'vasyl',
        nickName: 'vasyl.ivan',
      },
      {
        id: 1,
        fullName: 'Ivan Developerko',
        firstName: 'Ivan',
        lastName: 'Developerko',
        nickName: 'ivan.ivan',
      },
    ],
  },
  {
    id: 3,
    title: 'from "in progress"',
    status: 'in progress',
    users: [
      {
        id: 0,
        fullName: 'Ivan Developerko',
        firstName: 'Ivan',
        lastName: 'Developerko',
        nickName: 'ivan.ivan',
      },
    ],
  },
];

export const statuses = [
  {
    status: 'open',
  },
  {
    status: 'in progress',
  },
  {
    status: 'in review',
  },
  {
    status: 'done',
  },
];
