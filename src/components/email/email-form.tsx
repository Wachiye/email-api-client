/**
 * new email form
 */
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEmailPayload } from "../../types/email";
import { createEmailSchema } from "../../schemas/email-schemas";
import { sendEmail } from "../../services/email-service";
import { useEmail } from "../hooks/use-email";

function EmailForm() {
  const { senderEmail } = useEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEmailPayload>({
    defaultValues: {
      sender: senderEmail ?? "",
    },
    resolver: zodResolver(createEmailSchema),
  });

  const onSubmit: SubmitHandler<CreateEmailPayload> = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <Form
      className="text-start"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <FormGroup className="mb-3">
        <FormLabel>To</FormLabel>
        <FormControl
          className="bg-white"
          placeholder="To"
          {...register("recipient")}
        />
        {errors.recipient && (
          <FormText className="text-danger">
            {errors.recipient.message}
          </FormText>
        )}
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Subject</FormLabel>
        <FormControl
          className="bg-light"
          type="text"
          placeholder="Subject"
          {...register("subject")}
        />
        {errors.subject && (
          <FormText className="text-danger">{errors.subject.message}</FormText>
        )}
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Content</FormLabel>
        <FormControl
          as={"textarea"}
          className="bg-light"
          type="text"
          placeholder="Content"
          rows={10}
          {...register("content")}
        />
        {errors.content && (
          <FormText className="text-danger">{errors.content.message}</FormText>
        )}
      </FormGroup>
      <div className="d-flex justify-content-start align-items-center">
        <Button variant="dark" className="w-full" type="submit">
          Send Email
        </Button>
      </div>
    </Form>
  );
}

export default EmailForm;
