import React from 'react';
import UserList from './userlist';
import UserForm from './userform';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';


const Users = () => {
    return (
        <Box 
            component="main"
            sx={{ flexGrow: 2,
                bgcolor: 'background.default',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100vh',
                paddingTop: 15,
                width: '100vh',
                alignItems: 'center'
            }}
         >
            Users
            <UserList />
            <UserForm />
        </Box>
    );
}

export default Users;