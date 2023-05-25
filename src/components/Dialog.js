import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,email,phone,dob}=data

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._-]+@[a-z]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }
  const clearErrors=()=>{
    setErrors({});
  }
  const handleCancel=()=>{
    handleClose();
    clearErrors()
  }
 

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth error={errors.name} helperText={errors.name} />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth error={errors.email} helperText={errors.email} />
             <TextField id="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number" label="Phone Number" variant="outlined" margin="dense" fullWidth error={errors.phone} helperText={errors.phone} />
             <TextField id="dob" value={dob} onChange={e=>onChange(e)} variant="outlined" margin="dense" fullWidth  input type='date' />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=> {
            if (validate()) {
              handleFormSubmit();
            }
          }} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}