import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';


const UserForm = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
      });

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
                        type={user.showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setUser({ ...user, showPassword: !user.showPassword })}
                                    edge="end"
                                >
                                    {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <TextField
                    label="Password"
                    variant="outlined"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Button
                    variant="contained"
                    onClick={() => console.log(user)}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );

}

export default UserForm;