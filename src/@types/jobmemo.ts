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
  userId: number;
}

export interface ColumnType {
  id: number;
  title: string;
}

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface UserToken {
  token: string;
}
