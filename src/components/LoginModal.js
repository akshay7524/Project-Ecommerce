import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { setLoginStatus } from "../redux/Action";
import {
  Input,
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

  const LoginModal = ({ toggleShowModal }) => {
  const [modal, setModal] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
    if (toggleShowModal) {
      toggleShowModal();
    }
  };

  const handleLoginWithEmail = () => {
    setShowEmailForm(true); 
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      dispatch(setLoginStatus(true));
      toggle(); 
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleSubmitEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setLoginStatus(true));
      toggle(); 
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
      <ModalBody>
        {!showEmailForm ? (
          <div className="text-center">
            <Button
              color="primary"
              onClick={handleLoginWithEmail}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <img
                src="email-icon.png"
                alt="Email"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Sign in with Email
            </Button>
            <Button
              color="danger"
              onClick={handleLoginWithGoogle}
              style={{ width: "100%" }}
            >
              <img
                src="google-icon.png"
                alt="Google"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Sign in with Google
            </Button>
          </div>
        ) : (
          <Form>
            <FormGroup floating>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label for="password">Password</Label>
            </FormGroup>
            <Button
              color="primary"
              onClick={handleSubmitEmailLogin}
              style={{ width: "100%" }}
            >
              Login with Email
            </Button>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
