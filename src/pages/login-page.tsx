/**
 * login page
 */
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import LoginForm from "../components/auth/login-form";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Card bg="transparent p-0">
      <CardHeader>Login</CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
      <CardFooter>
      <p>
      Don't have an account?
        <Link to="/auth/register" className="mx-1">
            Register
        </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
