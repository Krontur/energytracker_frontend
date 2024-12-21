import { Stack, Button } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core';
import PropTypes from 'prop-types';

const CustomToolbarActions = ({ isAuthenticated, handleAuthClick }) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Button color="inherit" onClick={handleAuthClick}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </Button>
    <ThemeSwitcher />
  </Stack>
);

CustomToolbarActions.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleAuthClick: PropTypes.func.isRequired,
};

export default CustomToolbarActions;