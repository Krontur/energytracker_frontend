import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, OutlinedInput, Switch,
         FormHelperText, IconButton, InputAdornment, Select, MenuItem, FormLabel, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';


const UserForm = (  ) => {

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [fullNameErrorMessage, setFullNameErrorMessage] = useState('');
    const [roleError, setRoleError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState(false);
    const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState('');
    const [activeError, setActiveError] = useState(false);

    const [user, setUser] = useState({
        userAccountId: '',
        fullName: '',
        email: '',
        password: '',
        role: '',
        active: false
      });

    const validateForm = () => {
        let isValid = true;

        if (!user.fullName) {
            setFullNameError(true);
            setFullNameErrorMessage('Full Name is required');
            isValid = false;
        } else {
            setFullNameError(false);
            setFullNameErrorMessage('');
        }

        if (!user.email) {
            setEmailError(true);
            setEmailErrorMessage('Email is required');
            isValid = false;
        } else {
            handleEmailValidation({ target: { value: user.email } });
        }
        
        if (user.password !== passwordRepeat) {
            setPasswordError(true);
            setPasswordErrorMessage('Passwords do not match');
            setPasswordRepeatError(true);
            setPasswordRepeatErrorMessage('Passwords do not match');
            isValid = false;
        } else {
            if (user.password === '') {
                setPasswordError(true);
                setPasswordErrorMessage('Password is required');
                isValid = false;
            } else {
                setPasswordError(false);
                setPasswordErrorMessage('');
            }
            if (passwordRepeat === '') {
                setPasswordRepeatError(true);
                setPasswordRepeatErrorMessage('Password Repeat is required');
                isValid = false;
            } else {
                setPasswordRepeatError(false);
                setPasswordRepeatErrorMessage('');
            }
        }

        

        if (!user.role) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }

        if (user.active == null) {
            setActiveError(true);
            isValid = false;
        } else {
            setActiveError(false);
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(user);
        }
    };
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordRepeat = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    };
    
    const handleEmailValidation = () => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!emailRegex.test(user.email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address');
            return;
        }
        setEmailError(false);
        setEmailErrorMessage('');
    }


    return (
        <Box
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
                    required={true}
                    error={fullNameError || undefined}
                    helperText={fullNameErrorMessage}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                        handleEmailValidation();
                    }}
                    required={true}
                    error={emailError || undefined}
                    helperText={emailErrorMessage}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setUser({ ...user, password: e.target.value });
                        }}
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
                        required={true}
                        error={passwordError}
                    />
                    <FormHelperText
                        sx={{
                            color: '#d32f2f',
                        }}
                    >{passwordErrorMessage}</FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Repeat Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordRepeat ? 'text' : 'password'}
                        onChange={(e) => {
                            setPasswordRepeat(e.target.value); }
                        }
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
                        required={true}
                        error={passwordRepeatError}
                    />
                    <FormHelperText
                        sx={{
                            color: '#d32f2f',
                        }}
                    >{passwordRepeatErrorMessage}</FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel id="role-select-outlined-label">Role</InputLabel>
                    <Select
                        labelId="role-select-outlined-label"
                        id="role-select-outlined"
                        value={user.role}
                        label="Role"
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                        required={true}
                        error={roleError}
                    >
                        <MenuItem value="ADMIN">Administrator</MenuItem>
                        <MenuItem value="USER">User</MenuItem>                        
                    </Select>
                    <FormHelperText
                        sx={{
                            color: roleError ? '#d32f2f' : '',
                        }}
                    >Select the role for the user</FormHelperText>
                </FormControl>

                
                <FormControl variant="outlined">
                    <FormLabel component="legend">User active?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                type="checkbox"
                                checked={user.active}
                                onChange={(e) => setUser({ ...user, active: e.target.checked })}
                                required
                                error={activeError}
                            />
                        }
                        label="Active"
                    />
                </FormControl>

                <Button
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );

}

export default UserForm;