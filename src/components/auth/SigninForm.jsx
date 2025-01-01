import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const SigninForm = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signin({ email, password });
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error signing in:', error);
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
      <Typography variant="h5" align="center">Sign In</Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
      <Typography variant="body2" align="center">
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default SigninForm;