/**
 * private layout
 */
import emailLogo from "../../assets/email.svg";
import inboxIcon from "../../assets/inbox.svg";
import sentIcon from "../../assets/sent.svg";
import composeIcon from "../../assets/compose.svg";
import logoutIcon from "../../assets/logout.svg";

import { Badge, Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <Container fluid className="private-layout h-100 p-0">
      <Row>
        <Col
          md={4}
          className="sidebar-container d-flex flex-column justify-content-start no-scrollbar"
        >
          <div className="d-flex justify-content-start align-items-center sidebar-header ">
            <img
              src={emailLogo}
              className="logo email"
              alt="Email Client logo"
            />
            <span className="fs-5 fw-bolder text-capitalize">Email Client</span>
          </div>
          <div className="d-flex flex-column justify-content-start flex-fill">
            <Nav
              defaultActiveKey="/emails/inbox"
              className="flex-fill flex-column sidebar-menu"
            >
              <Nav.Item className="sidebar-menu-item">
                <Nav.Link
                  as={Link}
                  to="/emails/compose"
                  className="sidebar-link"
                >
                  <img
                    src={composeIcon}
                    className="sidebar-link-icon"
                    alt="icon"
                  />
                  <span className="sidebar-link-text"> Compose</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="sidebar-menu-item">
                <Nav.Link as={Link} to="/emails/inbox" className="sidebar-link">
                  <img
                    src={inboxIcon}
                    className="sidebar-link-icon"
                    alt="icon"
                  />
                  <span className="sidebar-link-text"> Inbox</span>
                  <Badge bg="dark" className="ms-auto">
                    4
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="sidebar-menu-item">
                <Nav.Link as={Link} to="/emails/sent" className="sidebar-link">
                  <img
                    src={sentIcon}
                    className="sidebar-link-icon"
                    alt="icon"
                  />
                  <span className="sidebar-link-text"> Sent</span>
                  <span className="ms-auto">18</span>
                </Nav.Link>
              </Nav.Item>
              <div className="mt-auto ">
                <p className="px-2">
                  Logged in as:
                  <br />
                  <span>example@email.com</span>
                </p>
                <Nav.Item className="sidebar-menu-item">
                  <Nav.Link as={Link} to="#" className="sidebar-link">
                    <img
                      src={logoutIcon}
                      className="sidebar-link-icon"
                      alt="icon"
                    />
                    <span className="sidebar-link-text"> Logout</span>
                  </Nav.Link>
                </Nav.Item>
              </div>
            </Nav>
          </div>
        </Col>
        <Col md={8} className="main-container flex flex-column justify-content-start gap-2 no-scrollbar">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default PrivateLayout;
