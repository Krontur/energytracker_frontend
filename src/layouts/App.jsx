import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';


const App = () => {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}

export default App;