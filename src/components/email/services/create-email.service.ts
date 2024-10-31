import { joiSchemaValidate } from "../../../lib/joi-schema-validate";
import { newId } from "../../../lib/utils";
import { Email } from "../../../models/email.model";
import { emitBroadcast } from "../../../socket/socket";
import { CreateEmailPayload, EmailData } from "../dto/email-dto.interface";
import { createEmailSchema } from "../dto/email-dto.schema";

export async function createEmailService(
  payload: CreateEmailPayload
): Promise<EmailData> {
  const data = joiSchemaValidate(payload, createEmailSchema, {
    stripUnknown: true,
  });

  const { sender, recipient, subject, content } = data;

  const email = await Email.create({
    id: await newId(),
    sender,
    recipient: recipient,
    subject,
    content,
    read: false,
  });

  emitBroadcast({event:"new-email",broadcast:true,data:email.toObject<EmailData>()});
  
  return email;
}
