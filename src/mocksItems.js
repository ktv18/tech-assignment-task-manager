export const users = [
  {
    id: 1,
    avatarUrl: 'https://picsum.photos/40/40',
    firstName: 'Katti',
    lastName: 'Beeken',
    nickName: 'Morden',
  },
  {
    id: 2,
    firstName: 'Carmela',
    lastName: 'Huff',
    nickName: 'Eacott',
  },
  {
    id: 3,
    firstName: 'Rawley',
    lastName: 'Scurrah',
    nickName: 'Dowtry',
  },
  {
    id: 4,
    firstName: 'Fraser',
    lastName: 'Tomankiewicz',
    avatarUrl: 'https://picsum.photos/40/40',
    nickName: 'Fusedale',
  },
  {
    id: 5,
    firstName: 'Kaleb',
    lastName: 'Glison',
    nickName: 'Giraths',
  },
  {
    id: 6,
    firstName: 'Brad',
    lastName: 'Flello',
    nickName: 'Tregaskis',
    avatarUrl: 'https://picsum.photos/40/40',
  },
  {
    id: 7,
    firstName: 'Josy',
    lastName: 'Bess',
    nickName: 'Gilberthorpe',
  },
  {
    id: 8,
    firstName: 'Tanner',
    lastName: 'Biggar',
    nickName: 'McDuall',
  },
  {
    id: 9,
    firstName: 'Flory',
    lastName: 'Hessenthaler',
    nickName: 'Dummer',
  },
  {
    id: 10,
    firstName: 'Page',
    lastName: 'Cosbey',
    nickName: 'Drever',
  },
  {
    id: 11,
    firstName: 'Khalil',
    lastName: 'Feehely',
    nickName: 'Adanez',
  },
  {
    id: 12,
    firstName: 'Chery',
    lastName: 'Radden',
    nickName: 'Ancell',
  },
  {
    id: 13,
    firstName: 'Alic',
    lastName: 'Meakes',
    nickName: 'Kynforth',
  },
  {
    id: 14,
    firstName: 'Bowie',
    lastName: 'Bettlestone',
    nickName: 'Bockett',
  },
  {
    id: 15,
    firstName: 'Blondell',
    lastName: 'Brecon',
    nickName: 'Andrysek',
  },
];
export const labels = [
  {
    id: '1',
    color: '#61bd4f',
    label: '',
  },
  {
    id: '2',
    color: '#61bd4f',
    label: 'Label 1',
  },
  {
    id: '3',
    color: '#f2d600',
    label: 'Label 2',
  },
  {
    id: '4',
    color: '#ff9f1a',
    label: 'Label 3',
  },
  {
    id: '5',
    color: '#c377e0',
    label: 'Label 4',
  },
  {
    id: '6',
    color: '#c377e0',
    label: 'Label test',
  },
];
export const tasks = [
  {
    id: 1,
    title: 'Hayes-Keebler',
    colId: getRandomColId(),
  },
  {
    id: 2,
    title: 'Beatty, Terry and Rice',
    colId: getRandomColId(),
  },
  {
    id: 3,
    title: 'Schmidt-Parker',
    colId: getRandomColId(),
  },
  {
    id: 4,
    title: 'Bergstrom, Hansen and Gerlach',
    colId: getRandomColId(),
  },
  {
    id: 5,
    title: 'Schamberger-Windler',
    colId: getRandomColId(),
  },
  {
    id: 6,
    title: 'Schulist Group',
    colId: getRandomColId(),
  },
  {
    id: 7,
    title: 'Moen, Haag and Carter',
    colId: getRandomColId(),
  },
  {
    id: 8,
    title: 'Koepp, Kreiger and Gislason',
    colId: getRandomColId(),
  },
  {
    id: 9,
    title: 'Bartell, Friesen and Farrell',
    colId: getRandomColId(),
  },
  {
    id: 10,
    title: 'Rohan LLC',
    colId: getRandomColId(),
  },
].map((task, index) => ({
  ...task,
  labels: labels.slice(Math.floor(Math.random() * 2), 2 + Math.floor(Math.random() * 3)),
  users: users.slice(Math.floor(Math.random() * 4), 5 + Math.floor(Math.random() * 5)),
}));

export const columns = [
  {
    id: 1,
    title: 'To do',
  },
  {
    id: 2,
    title: 'In Progress',
  },
  {
    id: 3,
    title: ' QA',
  },
  {
    id: 4,
    title: 'Done',
  },
];

function getRandomColId() {
  return Math.floor(Math.random() * 5);
}
