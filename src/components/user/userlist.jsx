import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, ButtonGroup, Button } from '@mui/material';
import { Delete, Edit, Visibility, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import UserForm from './Userform';
import Modal from '@mui/material/Modal';
import UserModal from './UserModal';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        handleFetchUsers();
    } , []);
    
    const handleClose = () => {
        setCreateUserFormModal(false);
        setViewUserFormModal(false);
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


    const [ createUserFormModal, setCreateUserFormModal ] = useState(false);
    const [ viewUserFormModal, setViewUserFormModal ] = useState(false);

    return (
        <Box sx={{  p: 1,
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: 1, 
                    backgroundColor: 'background.paper',
                    width: '100%',
                    maxWidth:'1280px',
                    margin: '0 auto',
                    alignItems: 'end',
                }}>
            <ButtonGroup sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'end'
            }}>
                <Button
                    onClick={() => setCreateUserFormModal(true)}
                >new</Button>                
            </ButtonGroup>
            <List
                sx={{ width: '100%', 
                      maxWidth: '1280px',
                      bgcolor: 'background.paper' }}
            >
                <ListItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        width: '100%',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #ccc', 
                        backgroundColor: 'primary.light',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: '87%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ flex: '1 1 10%', textAlign: 'left' }}>ID</Box>
                        <Box sx={{ flex: '1 1 40%', textAlign: 'left' }}>Full Name & Email</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Role</Box>
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Created Date</Box>
                    </Box>
                    <Box sx={{
                                display: 'flex',
                                width: '13%',
                                justifyContent: 'flex-start',
                            }}
                    >
                        Actions
                    </Box>
                </ListItem>

                {users.map((user, index) => (
                    <ListItem key={user.userAccountId}
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={
                                {
                                    display: 'flex',
                                    flex: '1',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '87%',
                                }
                            }
                        >
                            <ListItemText primary={user.userAccountId}
                                sx={{
                                    flex: '1 1 10%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={user.fullName} secondary={user.email}
                                sx={{
                                    flex: '1 1 40%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={user.role} 
                                sx={{
                                    flex: '1 1 30%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={user.createdDate} 
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
                                }}
                            />   
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '13%',
                                padding: '0 auto',
                            }}
                        >
                            <ListItemIcon>
                                <ButtonGroup>
                                    <IconButton onClick={() => console.log(index)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => console.log(index)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setSelectedUser(user);
                                        setViewUserFormModal(true)
                                    }}>
                                        <Visibility />
                                    </IconButton>
                                </ButtonGroup>
                            </ListItemIcon>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Modal open={createUserFormModal} >
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
            <UserModal open={viewUserFormModal} user={selectedUser} onClose={handleClose}/>
        </Box>
    );
}

export default UserList;