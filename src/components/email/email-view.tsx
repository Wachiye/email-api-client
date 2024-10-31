/**
 * email detail view
 */
import { Card, CardHeader, CardBody, CardText } from "react-bootstrap";
import { EmailData } from "../../types/email";
import { formatDate, formatDistanceToNow } from "date-fns";
import { useSocket } from "../hooks/use-socket";

function EmailView({ email }: { email: EmailData }) {
  const socket = useSocket();

  if (!email.read) {
    socket.emit({
      emailId: email._id,
      eventName: "read-email",
      read: true,
      timestamp: new Date().getTime(),
    });
  }

  return (
    <Card bg="transparent" className="p-1 email-card  border-0">
      <CardHeader className="email-author bg-transparent border-0 p-0 text-sm fw-medium">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <span>
              <strong>From: </strong>
              {email.sender}
            </span>
          </div>

          <span className="ms-auto email-time text-muted">
            {formatDate(email.createdAt, "dd-MM-yyyy HH:mm")}

            {` (${formatDistanceToNow(email.createdAt)})`}
          </span>
        </div>
      </CardHeader>
      <CardBody className="email-content p-0 pt-4 border-top mt-3">
        <CardText>{email.content}</CardText>
      </CardBody>
    </Card>
  );
}

export default EmailView;
