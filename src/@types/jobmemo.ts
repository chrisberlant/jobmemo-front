export interface CardType {
  id: string;
  title: string;
  category: string;
  index: number;
  enterpriseName: string;
  logoUrl: string;
  enterpriseActivity: string;
  contractType: string;
  description: string;
  offerUrl: string;
  location: string;
  salary: string;
  jobTitle: string;
  notation: number;
  color: string;
  isDeleted: boolean;
  notes: string;
  createdAt: Date;
  reminder: Date;
}

export interface CardItems {
  offres: {
    id: 0;
    name: 'Mes offres';
    color: '#eee';
    items: CardType[];
    className: 'offres';
  };
  candidatures: {
    id: 1;
    name: 'Mes candidatures';
    color: '#eee';
    items: CardType[];
    className: 'candidatures';
  };
  relances: {
    id: 2;
    name: 'Mes relances';
    color: '#eee';
    items: CardType[];
    className: 'relances';
  };
  entretiens: {
    id: 3;
    name: 'Mes entretiens';
    color: '#eee';
    items: CardType[];
    className: 'entretiens';
  };
  corbeille: {
    id: 4;
    name: 'Corbeille';
    color: '#eee';
    items: CardType[];
    className: 'recycle-bin';
  };
}

export interface CardTable {
  items: CardItems;
  isLoading: boolean;
  error: string | undefined;
  loadedCards: boolean;
  movingCardId: string;
  isEmpty: boolean;
}

export interface MovingCard {
  movingCardId: string;
  movingCardindex: number;
  movingCardcategory: string;
}

export interface ColumnType {
  id: number;
  title: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  items: CardType[];
  className: string;
}
export interface Categories {
  [key: string]: Category;
}

export interface ContactType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  phone: string;
  linkedinProfile: string;
  enterprise: string;
  comments: string;
  color: string;
}

export interface Contacts {
  items: ContactType[];
  isLoading: boolean;
  isEmpty: boolean;
  error: boolean;
  message: string | null;
}

export interface UserInfosType {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  address: string;
}

export interface UserType {
  infos: UserInfosType;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}
