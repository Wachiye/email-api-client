/**
 * login page
 */
import { Card, CardBody, CardHeader } from "react-bootstrap";
import LoginForm from "../components/auth/login-form";

function LoginPage() {
  return (
    <Card bg="transparent p-0">
      <CardHeader>Login</CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  );
}

export default LoginPage;
