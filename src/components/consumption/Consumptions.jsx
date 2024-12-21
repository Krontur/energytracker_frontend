import ConsumptionDashboard from './ConsumptionDashboard';
import { Box } from '@mui/material';

const Consumptions = () => {
    return (
        <Box
        component="main"
        sx={{ flexGrow: 2,
            bgcolor: 'background.default',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            alignItems: 'center',
            minWidth: '480px',
            height: 'auto',
            margin: '0 auto'
        }}
        >
            <h2>Consumptions</h2>
            <ConsumptionDashboard />
        </Box>
    );
}

export default Consumptions;