import { IRequest, IResponse, INext } from "../../../common/common.interface";
import { CreateEmailPayload } from "../dto/email-dto.interface";
import { createEmailService } from "../services/create-email.service";

export async function createEmailController(
  req: IRequest,
  res: IResponse,
  _next: INext
) {
  try {
    const payload = req.body as CreateEmailPayload;
    const email = await createEmailService(payload);
    res.success(email, "Success");
  } catch (error) {
    res.error("Unable to create email", error);
  }
}
