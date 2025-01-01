import { Box, TextField, Button, FormControl, InputLabel, OutlinedInput, Switch,
         FormHelperText, IconButton, InputAdornment, Select, MenuItem, FormLabel, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';


const UserForm = ({ onClose, loadUser }) => {

    const navigate = useNavigate();
    const { api } = useFetchWithAuth();

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

    const [user, setUser] = useState({
        userAccountId: '',
        fullName: '',
        email: '',
        password: '',
        role: '',
        isActive: false
      });

    useEffect(() => {
        if (loadUser != null){
            setUser(loadUser);
        } else {
            setUser({
                userAccountId: '',
                fullName: '',
                email: '',
                password: '',
                role: '',
                isActive: false
            });
        }
        
    } , []);

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

        if (!handleEmailValidation(user.email)) {
            isValid = false;
        }

        if (password === '') {
            setPasswordError(true);
            setPasswordErrorMessage('Password is required');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (passwordRepeat === '') {
            setPasswordRepeatError(true);
            setPasswordRepeatErrorMessage('Password is required');
            isValid = false;
        } else {
            setPasswordRepeatError(false);
            setPasswordRepeatErrorMessage('');
        }

        if (user.password !== passwordRepeat) {
            setPasswordRepeatError(true);
            setPasswordRepeatErrorMessage('Passwords do not match');
            isValid = false;
        } else {
            setPasswordRepeatError(false);
            setPasswordRepeatErrorMessage('');
        }

        if (!user.role) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }

        return isValid;
    };

    async function handleSubmit (e) {
        e.preventDefault();
        if (validateForm()) {
            try {
                const url = user.userAccountId 
                    ? `http://localhost:8083/api/v1/users/${user.userAccountId}`
                    : `http://localhost:8083/api/v1/users`;

                const { data, status } = user.userAccountId 
                    ? await api.patch(url, user)
                    : await api.post(url, user);

                if (status === 200 || status === 201) {
                    console.log('Success:', data);
                    onClose();
                    navigate('/users');
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordRepeat = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    };

    const handleEmailValidation = (email) => {
        let isEmailValid = true;

        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email === '') {
            setEmailError(true);
            setEmailErrorMessage('Email is required');
            isEmailValid = false;
        } else if (!emailRegex.test(email)) {
                setEmailError(true);
                setEmailErrorMessage('Please enter a valid email address');
                isEmailValid = false;;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        return isEmailValid;
        
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
                        handleEmailValidation(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleEmailValidation(e.target.value);
                            }
                    }}
                    required={true}
                    error={emailError || undefined}
                    helperText={emailErrorMessage}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password-1">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password-1"
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
                    <InputLabel htmlFor="outlined-adornment-password-2">Repeat Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password-2"
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
                        value={user.role || ''}
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
                                checked={user.isActive || false}
                                onChange={(e) => setUser({ ...user, isActive: e.target.checked })}
                                required={true}
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
UserForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    loadUser: PropTypes.object,
};

export default UserForm;