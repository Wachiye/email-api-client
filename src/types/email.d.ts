export interface CreateEmailPayload {
  sender: string;
  recipient?: string;
  subject?: string;
  content?: string;
}

export interface FilterEmailsPayload {
  id?: string;
  email?: string;
  subject?: string;
  read?: boolean;
}

export interface UpdateEmailPayload {
  emailId: string;
  read: boolean;
}

export interface EmailData {
  _id: string;
  sender?: string;
  recipient: string;
  subject?: string;
  content?: string;
  read: boolean;
  createdAt: Date;
}
