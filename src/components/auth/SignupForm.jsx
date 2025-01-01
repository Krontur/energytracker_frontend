import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup({
        email,
        password,
        fullName
      });
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      maxWidth: 400,
      margin: '0 auto',
      padding: 3
    }}>
      <Typography variant="h5" align="center">Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        variant="contained"
        size="large"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
      <Typography variant="body2" align="center">
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;