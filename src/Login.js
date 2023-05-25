import React, { useState } from "react";

import Aggrid from "./Aggrid";
import { TextField, Button, Link } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import "./Style.css";
import Logi from './media/loginimg.jpg'

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [unameValue, setUnameValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const  url="https://643fba8f3dee5b763e23c473.mockapi.io/api/v1/signup"

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { uname, pass } = event.target.elements;
    const response = await fetch(url);
    const userData = await response.json();
  
    const user = userData.find((user) => user.name === uname.value);
  
    if (user) {
      if (user.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        navigate("/Aggrid");
        setUnameValue("");
        setPassValue("");
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  

  const renderForm = (
    <div className="form" >
      
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField label='Username' name="uname" placeholder='Enter username' fullWidth required value={unameValue} onChange={e => setUnameValue(e.target.value)} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <TextField label='Password' name="pass" placeholder='Enter password' type='password' fullWidth required value={passValue} onChange={e => setPassValue(e.target.value)} />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <Button type='submit' color='primary' variant="contained"  fullWidth>Sign in</Button>
        </div>
      </form>
    </div>
  );

  return (
 
    <div className="app">
      <img src={Logi} alt="loginin"/>
      <div className="title">Sign In</div>
      <div className="login-form">
        {isSubmitted ? <Aggrid/> : renderForm}
        <Link href="/Signup">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Login;
