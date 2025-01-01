import { Stack, Button, Typography, Avatar } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomToolbarActions = () => {
  const { isAuthenticated, logout, user } = useAuth();
  
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {isAuthenticated ? (
        <>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.fullName?.charAt(0)}
            </Avatar>
            <Typography variant="subtitle2">
              {user?.fullName}
            </Typography>
          </Stack>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button 
          color="inherit" 
          component={Link} 
          to="/signin"
        >
          Login
        </Button>
      )}
      <ThemeSwitcher />
    </Stack>
  );
};

export default CustomToolbarActions;