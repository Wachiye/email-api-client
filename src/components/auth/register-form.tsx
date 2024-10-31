/**
 * register form
 */
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

function RegisterForm() {
  return (
    <Form className="text-start">
      <FormGroup className="mb-3">
        <FormLabel>Email</FormLabel>
        <FormControl
          className="bg-white"
          name="email"
          placeholder="Email Address"
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Password</FormLabel>
        <FormControl
          className="bg-light"
          type="password"
          name="password"
          placeholder="Password"
        />
      </FormGroup>
      <div className="d-grid">
        <Button variant="dark" className="w-full">
          Register
        </Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
