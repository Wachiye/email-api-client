export interface CreateEmailPayload {
  sender: string;
  recipient: string;
  subject?: string;
  content?: string;
}

export interface FilterEmailsPayload {
  id?:string;
  search?:string;
  read?: boolean;
  page?:number;
  limit?:number
}

export interface UpdateEmailPayload {
  emailId: string;
  read: boolean;
}

export interface EmailData {
  id: string;
  sender: string;
  recipient: string;
  subject?: string;
  content?: string;
  read: boolean;
  createdAt: Date;
}
