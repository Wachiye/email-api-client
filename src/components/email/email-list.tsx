import { Fragment } from "react";
import EmailCard from "./email-card";
import { Link } from "react-router-dom";

function EmailList() {
  return (
    <div className="email-list">
      {Array.from({ length: 20 }).map((_, index) => (
        <Fragment key={`email-${index}`}>
          <Link to={`/emails/${index + 1}`} className="text-decoration-none">
            <EmailCard />
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

export default EmailList;
