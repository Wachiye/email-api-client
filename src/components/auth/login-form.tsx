/**
 * login form
 */

import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmail } from "../hooks/use-email";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
});

type LoginData = {
  email: string;
};

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { setSenderEmail } = useEmail();
  const onSubmit: SubmitHandler<LoginData> = (data) => {
  
    setSenderEmail(data.email);
    console.log(data);
  };

  return (
    <Form className="text-start" onSubmit={handleSubmit(onSubmit)} method="POST">
      <FormGroup className="mb-3">
        <FormLabel>Email</FormLabel>
        <FormControl
          className="bg-white"
          placeholder="Email Address"
          {...register("email")}
        />
         {errors.email && (
          <FormText className="text-danger">
            {errors.email.message}
          </FormText>
        )}
      </FormGroup>
      <div className="d-grid">
        <Button variant="dark" className="w-full" type="submit" >
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
