/**
 * Details new email page
 */
import EmailView from "../components/email/email-view";
import PageHeader from "../components/shared/page-header";

function EmailDetailsPage() {
  return (
    <>
      <PageHeader title="Email Subject will be very wide on the screen" showBack />
      <div className="px-4">
        <EmailView />
      </div>
    </>
  );
}

export default EmailDetailsPage;
