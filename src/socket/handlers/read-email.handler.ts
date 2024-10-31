import {
  BaseReplyData,
 
} from "../socket.interface";

import { ReadEmailEvent } from "../socket.interface";
import { markAsReadService } from "../../components/email/services/mark-as-read.service";
import { EmailData } from "../../components/email/dto/email-dto.interface";

export const readEmailHandler = async (
  userId: string,
  data: ReadEmailEvent
): Promise<BaseReplyData<EmailData>> => {
  const email = await markAsReadService(userId, {
    emailId: data.emailId,
    read: data.read,
  });

  const res = {
    event: data.eventName,
    broadcast: false,
    data: email,
  };

  return res;
};
