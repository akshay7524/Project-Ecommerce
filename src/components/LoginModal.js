import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../redux/Action";
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

const LoginModal = ({ toggleShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // ⭐ ADD

  const toggle = () => toggleShowModal();

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      dispatch(setLoginStatus(true)); // ⭐ IMPORTANT

      Swal.fire("Success", "Login ho gaya 🙂", "success");
      toggle();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);

      dispatch(setLoginStatus(true)); // ⭐ IMPORTANT

      Swal.fire("Success", "Google login done 🙂", "success");
      toggle();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>Login</ModalHeader>

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

        <Button color="primary" onClick={loginEmail} block>
          Login
        </Button>

        <Button
          color="danger"
          onClick={loginGoogle}
          block
          style={{ marginTop: "10px" }}
        >
          Login with Google
        </Button>
      </ModalBody>

      <ModalFooter>
        <Button onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
