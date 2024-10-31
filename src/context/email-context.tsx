import React, {  useState, ReactNode } from 'react';
import { EmailContext } from '../components/hooks/use-email';
import { EmailData } from '../types/email';

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [senderEmail, setSenderEmail] = useState<string|null>(null);

  const [emails,setEmails] = useState<EmailData[]>([]);

  return (
    <EmailContext.Provider value={{ senderEmail, setSenderEmail, emails, setEmails }}>
      {children}
    </EmailContext.Provider>
  );
};