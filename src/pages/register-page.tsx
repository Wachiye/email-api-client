/**
 * register page
 */
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import RegisterForm from "../components/auth/register-form";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <Card bg="transparent">
      <CardHeader>Register</CardHeader>
      <CardBody>
        <RegisterForm />
      </CardBody>
      <CardFooter>
        <p>
          Already have an account?
          <Link to="/auth/login" className="mx-1">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default RegisterPage;
