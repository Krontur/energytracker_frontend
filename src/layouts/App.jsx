import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import CustomToolbarActions from '../components/toolbar/CustomToolbarActions';

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

export default App;