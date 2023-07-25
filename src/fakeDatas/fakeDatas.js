import { v4 as uuid } from 'uuid';

const fakeItems = [
  {
    id: uuid(),
    title: 'Annonce 01',
    enterpriseName: 'Google',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
    isDeleted: false,
  },
  {
    id: uuid(),
    title: 'Annonce 02',
    enterpriseName: 'Microsoft',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
    isDeleted: false,
  },
  {
    id: uuid(),
    title: 'Annonce 03',
    enterpriseName: 'Mozilla',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
    isDeleted: true,
  },
  {
    id: uuid(),
    title: 'Annonce 04',
    enterpriseName: 'Apple',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
    idDeleted: false,
  },
  {
    id: uuid(),
    title: 'Annonce 05',
    enterpriseName: 'Nvidia',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
    idDeleted: false,
  },
];

export const status = {
  [uuid()]: {
    id: 0,
    name: 'Mes Offres',
    color: '#eee',
    items: fakeItems,
    className: 'offers',
  },
  [uuid()]: {
    id: 1,
    name: 'Mes Candidatures',
    color: '#eee',
    items: [],
    className: 'applications',
  },
  [uuid()]: {
    id: 2,
    name: 'Mes Relances',
    color: '#eee',
    items: [],
    className: 'relaunch',
  },
  [uuid()]: {
    id: 3,
    name: 'Mes Entretiens',
    color: '#eee',
    items: [],
    className: 'interview',
  },
  [uuid()]: {
    id: 4,
    name: '',
    color: '#eee',
    items: [],
    className: 'recycle-bin',
  },
};

export default status;
