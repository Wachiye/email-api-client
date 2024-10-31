/**
 * Details new email page
 */
import { useParams } from "react-router-dom";
import EmailView from "../components/email/email-view";
import { useEmail } from "../components/hooks/use-email";
import PageHeader from "../components/shared/page-header";

function EmailDetailsPage() {
  const {id} = useParams();

  const { emails} = useEmail();

  const email = emails?.find(email => email._id === id);

  if(!email){
    return <div>Not found</div>
  }
  return (
    <>
      <PageHeader title={email.subject ?? ""} showBack />
      <div className="px-4">
        <EmailView email={email} />
      </div>
    </>
  );
}

export default EmailDetailsPage;
