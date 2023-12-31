export interface NotificationType {
  isLoading: boolean;
  text: string;
  error: boolean;
}

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
    createdAt: Date;
    color: string;
    isDeleted: boolean;
    rating: number;
  };
  index: number;
}

export interface TrashedCardType {
  id: string;
  title: string;
  enterpriseName: string;
  createdAt: Date;
  color: string;
  rating: number;
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
  loadedCards: boolean;
  isEmpty: boolean;
}

export interface ContactDetailsType {
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

export interface ContactType {
  id: string;
  firstName: string;
  lastName: string;
  enterprise: string;
  occupation: string;
}

export interface ContactsType {
  items: ContactDetailsType[];
  isEmpty: boolean;
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
  changedPassword: string | null;
}

export interface MenuItem {
  name: string;
  color: string;
}

export interface DocumentType {
  id: string;
  title: string;
  type: string;
  url: string;
}

export interface DocumentsType {
  items: DocumentType[];
  isEmpty: boolean;
}

export interface DocumentUploadFormType {
  title: string;
  type: string;
  file: File | null;
}
