/**
 * public layout
 */

import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <Container className="public-layout py-4">
      <div className="main-container p-0">
        <Outlet />
      </div>
    </Container>
  );
}

export default PublicLayout;
