import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PropTypes from 'prop-types';
import { Stack, Button } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core';
import { useAuth } from '../context/AuthContext';

function CustomToolbarActions () {

    const { isAuthenticated, handleAuthClick } = useAuth();

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button color="inherit" onClick={handleAuthClick}>
                {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
            <ThemeSwitcher />
        </Stack>
    );
    
}

const App = () => {

    return (
        <DashboardLayout
            slots={{
                toolbarActions: CustomToolbarActions,
            }}>
            <Outlet />
        </DashboardLayout>
    );
};

App.propTypes = {
    CustomToolbarActions: PropTypes.node.isRequired,
};


export default App;