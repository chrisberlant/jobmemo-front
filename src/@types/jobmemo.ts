export interface CardType {
  id: number;
  title: string;
  category: string;
  index: number;
  enterprise_name: string;
  logo_url: string;
  enterprise_activity: string;
  contract_type: string;
  description: string;
  offer_url: string;
  location: string;
  salary: string;
  job_title: string;
  notation: number;
  color: string;
  is_deleted: boolean;
  notes: string;
  created_at: string;
  reminder: Date;
  user_id: number;
}

export interface ColumnType {
  id: number;
  title: string;
}
