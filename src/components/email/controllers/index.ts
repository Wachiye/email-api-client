import BaseController, {
  INext,
  IRequest,
  IResponse,
  RouteDefinition,
} from "../../../common/common.interface";
import {
  createEmailController,
} from "./create-email.controller";
import {
  getEmailsController,
} from "./get-emails.controller";

export class EmailController extends BaseController {
  public basePath: string = "/emails";

  public routes(): RouteDefinition[] {
    return [
      {
        path: "/",
        method: "post",
        isPrivate:true,
        handler: createEmailController.bind(this),
      },
      {
        path: "/",
        method: "get",
        isPrivate:true,
        handler: getEmailsController.bind(this),
      },
      {
        path: "/:id",
        method: "get",
        isPrivate:true,
        handler: this.getEmailById.bind(this),
      },
    ];
  }

  private async getEmailById(req: IRequest, res: IResponse, next: INext) {
    req.query.id = req.params.id;
    return getEmailsController(req, res, next);
  }
}
