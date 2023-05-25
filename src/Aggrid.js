import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid, Button,IconButton } from '@material-ui/core'
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormDialog from './components/Dialog';
import { Link } from 'react-router-dom';
// import  clearError from './components/Dialog'


import './Aggrid.css'

const initialValue = { name: "", email: "", phone: "", dob: "" }
function Aggrid() {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [dialogOpen, setDialogOpen] = useState(false);

  // const [errors, setErrors] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
    
  };
  const url = `https://643f8a763dee5b763e1ed7bf.mockapi.io/api/student/student`
  const columnDefs = [
   
    { headerName: "Name", field: "name", },
    { headerName: "Email", field: "email", },
    { headerName: "phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob" },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        <IconButton color="primary" onClick={() => handleUpdate(params.data)}> <UpdateIcon/></IconButton>
        <IconButton  color="secondary" onClick={() => handleDelete(params.value)}><DeleteIcon/></IconButton>
      </div>
    }
  ]
   
  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
  }

  
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
 
  const handleDelete = (id) => {
    
      setDialogOpen(true);
     
    
      fetch(url + `/${id}`, { 
        method: "DELETE", 
       
         
        })
      
      .then(resp => resp.json())
      .then(resp => getUsers())}
        
      
    
    
  
  
  
  
  const handleFormSubmit = () => {
    if (formData.id) {
       
      
      fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true,
    animateRows: true
  }

  return (
    <div className="App">
      <h1 align="center">STUDENT DETAILS</h1>
      <h3>ENTER YOUR DETAILS</h3>
    
      <Grid align="right">
        <IconButton variant="contained" color="primary" onClick={handleClickOpen}><AccountCircleIcon/></IconButton>&nbsp;
        <Link  to="/">
        <IconButton variant="contained" color="primary" > <HomeIcon/></IconButton>
        </Link>
      </Grid><br></br>
      <div className="ag-theme-alpine" style={{ height: '400px'}}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
         animation-row={true}
        />
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this item?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={() => {
      // Call the API to delete the item here
      setDialogOpen(false);
    }} color="secondary">
      Delete
    </Button>
  </DialogActions>
</Dialog>
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
     
    </div>
  );
  }

export default Aggrid;