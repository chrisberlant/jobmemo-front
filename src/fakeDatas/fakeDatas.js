import { v4 as uuid } from 'uuid';

const fakeItems = [
  {
    id: uuid(),
    title: 'Annonce 01',
    enterpriseName: 'Google',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
  },
  {
    id: uuid(),
    title: 'Annonce 02',
    enterpriseName: 'Microsoft',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
  },
  {
    id: uuid(),
    title: 'Annonce 03',
    enterpriseName: 'Mozilla',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
  },
  {
    id: uuid(),
    title: 'Annonce 04',
    enterpriseName: 'Apple',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
  },
  {
    id: uuid(),
    title: 'Annonce 05',
    enterpriseName: 'Nvidia',
    color: '#666',
    createdAt: '21/07/23',
    notation: 4,
  },
];

export const status = {
  [uuid()]: {
    name: 'Mes Offres',
    color: '#eee',
    items: fakeItems,
    className: 'offers',
  },
  [uuid()]: {
    name: 'Mes Candidatures',
    color: '#eee',
    items: [],
    className: 'applications',
  },
  [uuid()]: {
    name: 'Mes Relances',
    color: '#eee',
    items: [],
    className: 'relaunch',
  },
  [uuid()]: {
    name: 'Mes Entretiens',
    color: '#eee',
    items: [],
    className: 'interview',
  },
  [uuid()]: {
    name: 'Corbeille',
    color: '#eee',
    items: [],
    className: 'trash',
  },
};

export default status;
