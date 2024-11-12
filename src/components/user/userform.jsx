import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, OutlinedInput, Switch,
         FormHelperText, IconButton, InputAdornment, Select, MenuItem, FormLabel, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';


const UserForm = (  ) => {

    const [user, setUser] = useState({
        userAccountId: '',
        fullName: '',
        email: '',
        password: '',
        role: '',
        active: false
      });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordRepeat = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };


    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '320px',
                gap: '1rem',
                padding: '1rem',
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                margin: '2rem',
                alignItems: 'center'
            }}
        >
            <h2>Create New User</h2>
            <Box
                component={'form'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '320px',
                    gap: '1rem',
                    borderColor: 'primary.main',
                    borderRadius: 1,
                }}
            >
                <TextField
                    label="userAccountId"
                    variant="outlined"
                    value={user.userAccountId}
                    disabled
                />

                <TextField
                    label="Full Name"
                    variant="outlined"
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword()}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Repeat Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordRepeat ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPasswordRepeat()}
                                    edge="end"
                                >
                                    {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel id="role-select-outlined-label">Role</InputLabel>
                    <Select
                        labelId="role-select-outlined-label"
                        id="role-select-outlined"
                        value={user.role}
                        label="Role"
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                    >
                        <MenuItem value="ADMIN">Administrator</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>
                    <FormHelperText>Select the role for the user</FormHelperText>
                </FormControl>

                
                <FormControl variant="outlined">
                    <FormLabel component="legend">User active?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                type="checkbox"
                                checked={user.active}
                                onChange={(e) => setUser({ ...user, active: e.target.checked })}
                            />
                        }
                        label="Active"
                    />
                </FormControl>

                <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );

}

export default UserForm;