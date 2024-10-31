/**
 * email sent page
 */

import { useState } from "react";
import EmailList from "../components/email/email-list";
import EmailPagination from "../components/shared/email-pagination";
import PageHeader from "../components/shared/page-header";

function EmailSentPage() {
  const [pagination, setPagination] = useState<{ limit: number; page: number }>(
    { limit: 10, page: 1 }
  );

  const onPrev = () => {
    setPagination((curr) => ({
      ...curr,
      page: curr.page > 1 ? curr.page - 1 : curr.page,
    }));
  };

  const onNext = () => {
    setPagination((curr) => ({ ...curr, page: curr.page + 1 }));
  };

  return (
    <>
      <PageHeader title="Sent">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <input className="form-control form-control-sm flex-fill"  placeholder={"Search email/subject"}/>
          <EmailPagination
            size={pagination.limit}
            onSizeChange={(size) =>
              setPagination((curr) => ({ ...curr, limit: size }))
            }
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </PageHeader>
      <div className="px-2">
        <EmailList />
      </div>
    </>
  );
}

export default EmailSentPage;
