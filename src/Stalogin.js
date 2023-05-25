import React, { useState } from "react";

import Other from './Other'
import { TextField, Button, Link } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import "./Style.css";
import Stlogi from './media/stafflogi.jpg'
function Login() {
 
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const database = [
    {
      username: "staff1",
      password: "pass1"
    },
    {
      username: "staff2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  const navigate = useNavigate();


  const handleSubmit = (event) => {
   
    event.preventDefault();
    

    var { uname, pass } = document.forms[0];

    
    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        navigate("/Other");
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
    <div className="form" width="340px">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
        <TextField label='Username'name="uname" placeholder='Enter username' fullWidth required/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
        <TextField label='Password' name="pass" placeholder='Enter password' type='password' fullWidth required/>
        
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
        <img src={Stlogi} alt="stloginin"/>
           <div className="title">Sign In</div>
      <div className="login-form">
       
        {isSubmitted ? <Other/> : renderForm}
     
                     <Link href="#" >
                        Forgot password ?
                </Link>
                
                   
               
      </div>
    </div>
  );
}

export default Login;