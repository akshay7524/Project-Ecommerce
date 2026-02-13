import React, { useState } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Input,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const SignupModal = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire("Success", "Account create ho gaya 🙂", "success");
      toggle();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>Signup</ModalHeader>

      <ModalBody>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button color="success" onClick={signup} block>
          Signup
        </Button>
      </ModalBody>

      <ModalFooter>
        <Button onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignupModal;
