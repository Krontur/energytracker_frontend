import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton, ButtonGroup, Button } from '@mui/material';
import { Group, Delete, Edit, Visibility } from '@mui/icons-material';


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
  

const UserList = () => {
    return (
        <Box sx={{ p: 1, border: 1, borderColor: 'primary.main', borderRadius: 1, width: '100vh' }}>
            <ButtonGroup sx={{ alignItems: 'end'}}>
                <Button>new</Button>                
            </ButtonGroup>
            <List>
                {users.map((user, index) => (
                    <ListItem key={index}>
                        <ListItemButton>
                            <ListItemText primary={user.fullName} secondary={user.email} />
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

        </Box>
    );
}

export default UserList;