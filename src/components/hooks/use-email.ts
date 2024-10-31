import { createContext, useContext } from "react";
import { EmailData } from "../../types/email";

interface EmailContextType {
  senderEmail: string|null;
  setSenderEmail: (email: string|null) => void;
  emails: EmailData[];
  setEmails: (emails: EmailData[]) => void;
}

export const EmailContext = createContext<EmailContextType | undefined>(
  undefined
);

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }
  return context;
};
