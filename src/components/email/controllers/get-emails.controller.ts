import { IRequest, IResponse, INext } from "../../../common/common.interface";
import { FilterEmailsPayload } from "../dto/email-dto.interface";
import { getEmailsService } from "../services/get-emails.service";

export async function getEmailsController(
  req: IRequest,
  res: IResponse,
  _next: INext
) {
  try {
    const filter = req.query as FilterEmailsPayload;
    const emails = await getEmailsService(filter);
    res.success(emails, "Success");
  } catch (error) {
    res.error("Unable to retrieve emails", error);
  }
}
