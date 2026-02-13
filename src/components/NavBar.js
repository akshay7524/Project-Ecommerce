import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import webLogo from "./webLogo.gif";
import {
  Button,
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoginStatus, clearCart } from "../redux/Action";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cartData = useSelector((state) => state.cartData);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [badgeValue, setBadgeValue] = useState(0);
  const [collapsed, setCollapsed] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setBadgeValue(isLoggedIn ? cartData.length : 0);
  }, [cartData, isLoggedIn]);

  // ⭐ PROPER LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await signOut(auth);

      dispatch(setLoginStatus(false));
      dispatch(clearCart());

      setShowLogin(false);
      setShowSignup(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowLogin(true);
    }
  };

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar fixed="top" color="light" expand="md">
        <NavbarBrand href="/">
          <img alt="logo" src={webLogo} style={{ height: 30 }} />
          Apna Store
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} />

        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <Link to="/Cart">
          <Button color="primary" outline className="me-2">
            Cart <Badge>{badgeValue}</Badge>
          </Button>
        </Link>

        <Button color="primary" onClick={handleLoginClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>

        {!isLoggedIn && (
          <Button
            color="success"
            onClick={() => setShowSignup(true)}
            style={{ marginLeft: "10px" }}
          >
            Signup
          </Button>
        )}
      </Navbar>

      {showLogin && (
        <LoginModal toggleShowModal={() => setShowLogin(false)} />
      )}

      {showSignup && (
        <SignupModal toggle={() => setShowSignup(false)} />
      )}
    </>
  );
};

export default NavBar;
