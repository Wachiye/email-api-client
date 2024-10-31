/**
 * email sent page
 */

import { useEffect, useState } from "react";
import EmailList from "../components/email/email-list";
import EmailPagination from "../components/shared/email-pagination";
import PageHeader from "../components/shared/page-header";
import { useEmail } from "../components/hooks/use-email";
import { fetchEmails } from "../services/email-service";

function EmailSentPage() {
  const [filter, setFilter] = useState<{
    limit: number;
    page: number;
    search?: string;
  }>({ limit: 10, page: 1 });

  const { emails, setEmails, senderEmail } = useEmail();

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const res = await fetchEmails(filter);
        setEmails(res.data);
      } catch (err) {
        console.log("Failed to fetch emails.", err);
      }
    };

    loadEmails();
  }, [filter, setEmails]);

  const onPrev = () => {
    setFilter((curr) => ({
      ...curr,
      page: curr.page > 1 ? curr.page - 1 : curr.page,
    }));
  };

  const onNext = () => {
    setFilter((curr) => ({ ...curr, page: curr.page + 1 }));
  };

  return (
    <>
      <PageHeader title="Sent">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <input
            className="form-control form-control-sm flex-fill"
            placeholder={"Search email/subject"}
            onChange={(e) =>
              setFilter((curr) => ({
                ...curr,
                search: e.target.value,
              }))
            }
          />
          <EmailPagination
            size={filter.limit}
            onSizeChange={(size) =>
              setFilter((curr) => ({ ...curr, limit: size }))
            }
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </PageHeader>
      <div className="px-2">
        <EmailList
          emails={emails?.filter((email) => email.sender === senderEmail)}
        />
      </div>
    </>
  );
}

export default EmailSentPage;
