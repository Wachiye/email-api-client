import { joiSchemaValidate } from "../../../lib/joi-schema-validate";
import { Email } from "../../../models/email.model";
import { emitBroadcast } from "../../../socket/socket";
import { EmailData, UpdateEmailPayload } from "../dto/email-dto.interface";
import { updateEmailSchema } from "../dto/email-dto.schema";

export async function markAsReadService(
  userId: string,
  payload: UpdateEmailPayload
): Promise<EmailData> {
  const data = joiSchemaValidate(payload, updateEmailSchema, {
    stripUnknown: true,
  });

  const { emailId, read } = data;
  const email = await Email.findOne({
    _id: emailId,
    $or: [{ recipient: userId }, { sender: userId }],
  }).populate(["sender", "recipient"]);

  if (!email) {
    throw new Error(`Email not found`);
  }

  email.read = read;

  await email.save();

  emitBroadcast({event:"read-email",broadcast:true,data:email.toJSON<EmailData>()});
  

  return email.toObject<EmailData>();
}
