/**
 * email detail view
 */
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
} from "react-bootstrap";

function EmailView() {
  return (
    <Card bg="transparent" className="p-1 email-card  border-0">
      <CardHeader className="email-author bg-transparent border-0 p-0 text-sm fw-medium">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <span>
              {" "}
              <strong>From: </strong>Wachiye Siranjofu
            </span>
            <span>
              {" "}
              <strong>Email: </strong>exmaple.@email.com
            </span>
          </div>

          <span className="ms-auto email-time text-muted">
            {new Date().toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardBody className="email-content p-0 pt-4 border-top mt-3">
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare
          lacinia neque ut laoreet. Nunc tortor justo, hendrerit quis felis id,
          maximus auctor neque....
        </CardText>
      </CardBody>
    </Card>
  );
}

export default EmailView;
