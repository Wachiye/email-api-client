import { Fragment } from "react";
import EmailCard from "./email-card";
import { Link } from "react-router-dom";
import { EmailData } from "../../types/email";

function EmailList({emails}:{emails:EmailData[]}) {
  return (
    <div className="email-list">
      {emails?.map((email) => (
        <Fragment key={email._id}>
          <Link to={`/emails/${email._id}`} className="text-decoration-none">
            <EmailCard email={email} />
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

export default EmailList;
