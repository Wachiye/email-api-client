/**
 * email card
 */

import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";

function EmailCard() {
  return (
    <Card bg="transparent" className="p-1 email-card read">
      <CardHeader className="email-author bg-transparent border-0 p-0 text-sm fw-medium">
        <div className="d-flex">
          <span>Wachiye Siranjofu</span>
          <span className="ms-auto email-time">
            {new Date().toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardBody className="email-content p-0">
        <CardText>
          <strong>Email Subject{" - "}</strong>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare
          lacinia neque ut laoreet. Nunc tortor justo, hendrerit quis felis id,
          maximus auctor neque....
        </CardText>
      </CardBody>
    </Card>
  );
}

export default EmailCard;
