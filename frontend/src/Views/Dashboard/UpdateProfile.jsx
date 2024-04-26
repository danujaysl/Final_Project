// EditProfileDialog.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import Axios from '../../api/axios';
import { useSnackbar } from '../../CommonComponents/SnackBarContext';
import validator from 'validator';


const EditProfileDialog = ({ open, onClose, user, onUpdateUser }) => {

  //passing through the parent element
  const [editedUser, setEditedUser] = useState({ ...user });
  const {openSnackbar, closeSnackbar} = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  useEffect(()=>{
    
    setEditedUser({...user})
  },[user])

  const handleSubmit = async () => {
    try {

      if(!validator.isEmail(editedUser.email)){
        openSnackbar({
          message: `Please provide a valid email`,
          color:'red',
      
        })

        return
      }

      const token = JSON.parse(localStorage.getItem('user'))?.token

        const headers = {
            Authorization: `Bearer ${token}`
        };

     
      await Axios.put('/user/updateUser',editedUser,{headers});

      // Update the user locally
      onUpdateUser(editedUser);
      openSnackbar({
        message: `User updated`,
        color:'green',
    
})
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      openSnackbar({
        message: `User update fail`,
        color:'red',
    
})
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent sx={{display:'flex',gap:2, flexDirection:'column',width:'600px'}}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          value={editedUser.username}
          onChange={handleChange}
          sx={{marginTop:'20px'}}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={editedUser.email}
          onChange={handleChange}
        />
      
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
