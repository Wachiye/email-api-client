/**
 * private layout
 */
import emailLogo from "../../assets/email.svg";
import inboxIcon from "../../assets/inbox.svg";
import sentIcon from "../../assets/sent.svg";
import composeIcon from "../../assets/compose.svg";
import logoutIcon from "../../assets/logout.svg";

import { Badge, Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useEmail } from "../hooks/use-email";
import { SocketProvider } from "../../context/socket-context";
import { useEffect, useState } from "react";

function PrivateLayout() {
  const { senderEmail, setSenderEmail, emails } = useEmail();

  const [unread, setUnread] = useState(0);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    setUnread(emails.filter((email) => email.read === false && email.recipient === senderEmail).length);
    setSent(emails.filter((email) => email.sender === senderEmail).length);
  }, [emails, senderEmail]);

  if (!senderEmail) {
    return <Navigate to={"/"} />;
  }

  return (
    <SocketProvider>
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
              <span className="fs-5 fw-bolder text-capitalize">
                Email Client
              </span>
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
                  <Nav.Link
                    as={Link}
                    to="/emails/inbox"
                    className="sidebar-link"
                  >
                    <img
                      src={inboxIcon}
                      className="sidebar-link-icon"
                      alt="icon"
                    />
                    <span className="sidebar-link-text"> Inbox</span>
                    {unread > 0 && (
                      <Badge bg="dark" className="ms-auto">
                        {unread}
                      </Badge>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="sidebar-menu-item">
                  <Nav.Link
                    as={Link}
                    to="/emails/sent"
                    className="sidebar-link"
                  >
                    <img
                      src={sentIcon}
                      className="sidebar-link-icon"
                      alt="icon"
                    />
                    <span className="sidebar-link-text"> Sent</span>
                    {sent > 0 && <span className="ms-auto">{sent}</span>}
                  </Nav.Link>
                </Nav.Item>
                <div className="mt-auto ">
                  <p className="px-2">
                    Logged in as:
                    <br />
                    <span>{senderEmail}</span>
                  </p>
                  <Nav.Item
                    className="sidebar-menu-item"
                    onClick={() => setSenderEmail(null)}
                  >
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
          <Col
            md={8}
            className="main-container flex flex-column justify-content-start gap-2 no-scrollbar"
          >
            <Outlet />
          </Col>
        </Row>
      </Container>
    </SocketProvider>
  );
}

export default PrivateLayout;
