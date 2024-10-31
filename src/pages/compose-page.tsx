/**
 * compose new email page
 */
import EmailForm from "../components/email/email-form";
import PageHeader from "../components/shared/page-header";

function EmailComposePage() {
  return (
    <>
      <PageHeader title="Compose" />
      <div className="px-4">
        <EmailForm />
      </div>
    </>
  );
}

export default EmailComposePage;
