/**
 * page header
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/back.svg";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  showBack?: boolean;
}

function PageHeader({ showBack, title, children }: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="page-header d-flex flex-row justify-content-between align-items-center sticky-top z-[10]">
      {showBack && (
        <div className="actions">
          <img
            src={backIcon}
            className="text-white cursor-pointer me-2"
            alt=""
            width={16}
            onClick={() => navigate(-1)}
          />
        </div>
      )}
      <div className="title flex-fill flex flex-row justify-content-start align-items-center">
        {title}
      </div>
      <div className="actions flex-fill">{children}</div>
    </div>
  );
}

export default PageHeader;
