import MeteringPointList from './MeteringPointList';
import { Box } from '@mui/material';


const MeteringPoints = () => {
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
            <h2>Metering Points</h2>
            <MeteringPointList />
        </Box>
    );
}

export default MeteringPoints;