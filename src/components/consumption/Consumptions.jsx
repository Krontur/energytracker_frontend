import { useEffect, useState } from 'react';
import ConsumptionChart from './ConsumptionChart';
import ConsumptionForm from './ConsumptionForm';
import { Box, Typography } from '@mui/material';

const Consumptions = () => {
    const [consumptions, setConsumptions] = useState(null);
    const [intervalType, setIntervalType] = useState('INTERVAL');

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 2,
                bgcolor: 'background.default',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                alignItems: 'center',
                minWidth: '480px',
                height: 'auto',
                margin: '0 auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Consumptions
            </Typography>
            <ConsumptionForm setConsumptions={setConsumptions} setIntervalType={setIntervalType} />
            {consumptions && consumptions.length > 0 && (
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '800px',
                        height: '500px',
                        mt: 4,
                    }}
                >
                    <ConsumptionChart data={consumptions} intervalType={intervalType} />
                </Box>
            )}
        </Box>
    );
};

export default Consumptions;
