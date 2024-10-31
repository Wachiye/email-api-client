/**
 * email card
 */

import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import { EmailData } from "../../types/email";

import { formatDistanceToNow } from "date-fns";

function EmailCard({ email }: { email: EmailData }) {
  return (
    <Card bg="transparent" className="p-1 email-card read">
      <CardHeader className="email-author bg-transparent border-0 p-0 text-sm fw-medium">
        <div className="d-flex">
          <span>{email.sender}</span>
          <span className="ms-auto email-time">
            {formatDistanceToNow(email.createdAt)}
          </span>
        </div>
      </CardHeader>
      <CardBody className="email-content p-0">
        <CardText>
          <strong>
            {email.subject}
            {" - "}
          </strong>
          {email.content?.slice(0, 150)}{"..."}
        </CardText>
      </CardBody>
    </Card>
  );
}

export default EmailCard;
