/**
 * new email form
 */
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

function EmailForm() {
  return (
    <Form className="text-start">
      <FormGroup className="mb-3">
        <FormLabel>To</FormLabel>
        <FormControl
          className="bg-white"
          name="to"
          placeholder="To"
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Subject</FormLabel>
        <FormControl
          className="bg-light"
          type="text"
          name="subject"
          placeholder="Subject"
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Content</FormLabel>
        <FormControl
          as={"textarea"}
          className="bg-light"
          type="text"
          name="content"
          placeholder="Content"
          rows={10}
        />
      </FormGroup>
      <div className="d-flex justify-content-start align-items-center">
        <Button variant="dark" className="w-full">
          Send Email
        </Button>
      </div>
    </Form>
  );
}

export default EmailForm;
