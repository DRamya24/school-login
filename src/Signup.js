import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import "./Signup.css";
import Login from "./Login";


function Reg() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false); // state for dialog box

  // Regular expression for a valid email address
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const handleCancel = () => {
    setName("");
    setPassword("");
    setEmail("");
    handleClose()
  };
  const handleClose = () => {
    setOpen(false);
    
    
  };
  function validateForm() {
    // Check if the name field is not empty
    if (name.trim() === "") {
      setOpen(true);
      return false;
    }

    // Check if the password field is at least 8 characters long
    if (password.length < 8) {
      setOpen(true);
      return false;
    }

    // Check if the email field is a valid email address
    if (!emailRegex.test(email)) {
      setOpen(true);
      return false;
    }

    return true;
  }

  async function signUp() {
    // Validate the form input
    if (!validateForm()) {
      return;
    }

    // Create the user object
    let user = { name, password, email };

    // Send a POST request to the server to create the user
    let response = await fetch(
      "https://643fba8f3dee5b763e23c473.mockapi.io/api/v1/signup",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Parse the response body as JSON
    let data = await response.json();

    // Save the user info to local storage
    localStorage.setItem("user-info", JSON.stringify(data));

  

    // Navigate to the login page
    navigate("/login");
  }

  return (
    <div className="col-sm-6 offset-sm-3">
      <h1>Sign Up</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
        placeholder="name"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="password"
      />
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="email"
      />
      <br />
      <button onClick={signUp} className="btn btn-primary">
        Sign Up
      </button>

      {/* Dialog box for error message */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          {name.trim() === "" && <div>Name cannot be empty</div>}
          {password.length < 8 && <div>Password must be at least 8 characters long</div>}
          {(!emailRegex.test(email)) && <div>invalid email</div>}
          </DialogContent>
          <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        {/* <Button onClick={validateForm}>OK</Button> */}
      </DialogActions>
          </Dialog>
          </div>
    )
  }
  export  default Reg;