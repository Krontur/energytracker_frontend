import { Container, Paper, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const MeteringPointInfo = () => {

    const { id } = useParams();
    const { api } = useFetchWithAuth();

    const [meteringPointInfo, setMeteringPointInfo] = useState({});
    const [channel, setChannel] = useState(null);
    const [energyMeter, setEnergyMeter] = useState(null);

    const handleFetchMeteringPointInfo = async () => {
        try {
        const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/metering-points/${id}`);
            if(status === 200) {
                console.log(data);
                setMeteringPointInfo(data);
                setChannel(data.channel);
                setEnergyMeter(data.energyMeter);
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        console.log('MeteringPointInfo component mounted');
        console.log(meteringPointInfo);
        handleFetchMeteringPointInfo();
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <Container maxWidth="lg">
        <Box sx={{ position: 'relative', mb: 4 }}>
            <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ position: 'absolute', top: '20px', left: '20px' }}
            >
            Back
            </Button>
            <Typography variant="h4" gutterBottom sx={{ pt: 8, textAlign: 'center' }}>
            MeteringPoint Information
            </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom>Device Details</Typography>
                <Typography>ID: {meteringPointInfo.meteringPointId}</Typography>
                <Typography>Status: {meteringPointInfo.activeStatus}</Typography>
                <Typography>Location name: {meteringPointInfo.locationName}</Typography>
                <Typography>Connection description: {meteringPointInfo.connectionDescription}</Typography>
                <Typography>Created: {new Date(meteringPointInfo.createdDate).toLocaleString()}</Typography>
                <Typography>Updated: {new Date(meteringPointInfo.updatedDate).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom>Technical Specifications</Typography>
                <Typography>Energymeter Serial Number: {energyMeter?.serialNumber}</Typography>
                <Typography>Energy meter type: {energyMeter?.energyMeterType}</Typography>
                <Typography>Energy meter status: {energyMeter?.deviceStatus}</Typography>
                <Typography>Channel number: {channel?.channelNumber}</Typography>
                <Typography>Channel name: {channel?.channelName}</Typography>
            </Box>
            </Box>
        </Paper>

        </Container>
    );
    };

    export default MeteringPointInfo;



