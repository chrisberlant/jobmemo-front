export interface CardType {
  id: string;
  title: string;
  category: string;
  index: number;
  enterpriseName: string;
  logoUrl: string;
  enterpriseActivity: string;
  contractType: string;
  comments: string;
  offerUrl: string;
  location: string;
  salary: string;
  jobTitle: string;
  rating: number;
  color: string;
  isDeleted: boolean;
  createdAt: Date;
  reminder: Date;
}

export interface DashboardCard {
  item: {
    id: string;
    title: string;
    enterpriseName: string;
    createdAt: string;
    color: string;
    isDeleted: boolean;
    rating: number;
  };
  index: number;
}

export interface ColumnsData {
  [key: string]: {
    className: string;
    id: number;
    color: string;
    items?: CardType[];
  };
}

export interface ColumnProps {
  droppableId: string;
  column: {
    className: string;
    id: number;
    color: string;
    items?: Array<{
      index: number;
      id: React.Key;
    }>;
  };
  trashColumn: boolean;
}

export interface CardTable {
  items: CardType[];
  trashedItems: CardType[];
  isLoading: boolean;
  error: string | undefined;
  loadedCards: boolean;
  isEmpty: boolean;
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
  changedPassword: string | null;
}

export interface MenuItem {
  name: string;
  color: string;
}
