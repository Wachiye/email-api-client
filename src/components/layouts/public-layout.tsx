/**
 * public layout
 */

import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { useEmail } from "../hooks/use-email";

function PublicLayout() {

  const { senderEmail } = useEmail();

  if(senderEmail){
    return <Navigate  to={"/emails/inbox"} />
  }

  return (
    <Container className="public-layout py-4">
      <div className="main-container p-0">
        <Outlet />
      </div>
    </Container>
  );
}

export default PublicLayout;
