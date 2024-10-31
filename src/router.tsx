import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "./components/layouts/public-layout";
import LoginPage from "./pages/login-page";
import PrivateLayout from "./components/layouts/private-layout";
import EmailInboxPage from "./pages/emails-inbox-page";
import EmailSentPage from "./pages/emails-sent-page";
import EmailComposePage from "./pages/compose-page";
import EmailDetailsPage from "./pages/email-details-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/emails",
    element: <PrivateLayout />,
    children: [
      {
        path: "/emails/",
        element: <Navigate to="/emails/inbox" />,
      },
      {
        path: "/emails/inbox",
        element: <EmailInboxPage />,
      },
      {
        path: "/emails/sent",
        element: <EmailSentPage />,
      },
      {
        path: "/emails/compose",
        element: <EmailComposePage />,
      },
      {
        path: "/emails/:id",
        element: <EmailDetailsPage />,
      },
    ],
  },
]);

export default router;
