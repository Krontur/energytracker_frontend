import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, ButtonGroup, Button, Switch } from '@mui/material';
import { Edit, Visibility, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import UserForm from './userform';
import Modal from '@mui/material/Modal';
import UserModal from './UserModal';
import useRoleCheck from '../../hooks/useRoleCheck';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const UserList = () => {
    const { isAdmin } = useRoleCheck();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const { api } = useFetchWithAuth();

    useEffect(() => {
        handleFetchUsers();
    }, []);

    const handleClose = () => {
        setCreateUserFormModal(false);
        setViewUserFormModal(false);
        handleFetchUsers();
    };

    const handleFetchUsers = async () => {
        console.log('fetching users');
        try {
            const { data, status } = await api.get('http://localhost:8083/api/v1/users');
            if (status === 200) {
                console.log(data);
                setUsers(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const [createUserFormModal, setCreateUserFormModal] = useState(false);
    const [viewUserFormModal, setViewUserFormModal] = useState(false);

    return (
        <Box
            sx={{
                p: 1,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto',
                alignItems: 'end',
            }}
        >
            {isAdmin() && (
                <ButtonGroup
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'end',
                    }}
                >
                    <Button
                        onClick={() => {
                            setCreateUserFormModal(true);
                            setSelectedUser({});
                        }}
                    >
                        New
                    </Button>
                </ButtonGroup>
            )}
            <List
                sx={{
                    width: '100%',
                    maxWidth: '1280px',
                    bgcolor: 'background.paper',
                }}
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Role</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Is Active</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Created Date</Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '13%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        Actions
                    </Box>
                </ListItem>

                {users.map((user) => (
                    <ListItem
                        key={user.userAccountId}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '87%',
                            }}
                        >
                            <ListItemText
                                primary={user.userAccountId}
                                sx={{
                                    flex: '1 1 10%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={user.fullName}
                                secondary={user.email}
                                sx={{
                                    flex: '1 1 40%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={user.role}
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
                                }}
                            />
                            <Box
                                sx={{
                                    flex: '1 1 15%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                                >
                                <Switch
                                    checked={user.isActive}
                                    disabled
                                />
                            </Box>
                            <ListItemText
                                primary={user.createdDate}
                                sx={{
                                    flex: '1 1 15%',
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
                                    {isAdmin() && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setCreateUserFormModal(true);
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setViewUserFormModal(true);
                                        }}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </ButtonGroup>
                            </ListItemIcon>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Modal open={createUserFormModal}>
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
                        flexDirection: 'column',
                    }}
                >
                    <IconButton onClick={() => handleClose()} sx={{ alignSelf: 'flex-end' }}>
                        <Close />
                    </IconButton>
                    <UserForm onClose={handleClose} loadUser={selectedUser} />
                </Box>
            </Modal>
            <UserModal open={viewUserFormModal} user={selectedUser} onClose={handleClose} />
        </Box>
    );
};

export default UserList;
