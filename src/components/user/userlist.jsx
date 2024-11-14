import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, ButtonGroup, Button } from '@mui/material';
import { Delete, Edit, Visibility, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import UserForm from './userform';
import Modal from '@mui/material/Modal';

/*
const users = [
    {
      fullName: "Alice Smith",
      email: "alice.smith@example.com",
      password: "password123"
    },
    {
      fullName: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "securepassword"
    },
    {
      fullName: "Charlie Brown",
      email: "charlie.brown@example.com",
      password: "mypassword"
    }
  ];
*/
  

const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        handleFetchUsers();
    } , []);
    
    const handleClose = () => {
        setCreateUserModal(false);
    };

    const handleFetchUsers = async () => {
        console.log('fetching users');
        try {
            const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsers(data);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const [ createUserModal, setCreateUserModal ] = useState(false);

    return (
        <Box sx={{  p: 1,
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: 1, 
                    backgroundColor: 'background.paper',
                    width: '100%',
                    maxWidth:'1280px',
                    margin: '0 auto',
                }}>
            <ButtonGroup sx={{ alignItems: 'end'}}>
                <Button
                    onClick={() => setCreateUserModal(true)}
                >new</Button>                
            </ButtonGroup>
            <List
                sx={{ width: '100%', 
                      maxWidth: '1280px',
                      bgcolor: 'background.paper' }}
            >
                {users.map((user, index) => (
                    <ListItem key={user.userAccountId}
                        sx={{ 
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            }}
                    >
                        <ListItemButton>
                            <ListItemText primary={user.userAccountId} />
                            <ListItemText primary={user.fullName} secondary={user.email} />
                            <ListItemText primary={user.role} />
                            <ListItemText primary={user.createdDate} />
                            <ListItemIcon>
                                <ButtonGroup>
                                    <IconButton onClick={() => console.log(index)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => console.log(index)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => console.log(index)}>
                                        <Visibility />
                                    </IconButton>
                                </ButtonGroup>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Modal open={createUserModal} >
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <IconButton onClick={() => handleClose()} sx={{ alignSelf:'flex-end'}}>
                        <Close />
                    </IconButton>
                    <UserForm onClose={handleClose}/>
                </Box>
            </Modal>
        </Box>
    );
}

export default UserList;