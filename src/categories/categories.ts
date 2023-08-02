import { v4 as uuid } from 'uuid';
import { Categories } from '../@types/jobmemo';

const categories: Categories = {
  [uuid()]: {
    id: 0,
    name: 'Mes offres',
    color: '#eee',
    items: [],
    className: 'offers',
  },
  [uuid()]: {
    id: 1,
    name: 'Mes candidatures',
    color: '#eee',
    items: [],
    className: 'applications',
  },
  [uuid()]: {
    id: 2,
    name: 'Mes relances',
    color: '#eee',
    items: [],
    className: 'relaunch',
  },
  [uuid()]: {
    id: 3,
    name: 'Mes entretiens',
    color: '#eee',
    items: [],
    className: 'interview',
  },
  [uuid()]: {
    id: 4,
    name: 'Corbeille',
    color: '#eee',
    items: [],
    className: 'recycle-bin',
  },
};

export default categories;
