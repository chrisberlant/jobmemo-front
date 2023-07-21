export interface CardType {
  id: number;
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
  createdAt: string;
  reminder: Date;
  userId: number;
}

export interface ColumnType {
  id: number;
  title: string;
}

export interface UserType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}
