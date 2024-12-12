import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MeteringPointInfo = () => {

    const { id } = useParams();

    const [meteringPointInfo, setMeteringPointInfo] = useState({});
    const [channels, setChannels] = useState([]);

    const handleFetchMeteringPointInfo = async () => {
        try {
        const response = await fetch(`http://localhost:8080/api/v1/metering-points/${id}`, {
            method: 'GET',  
            });
            if(response.ok) {
            const data = await response.json();
            setMeteringPointInfo(data);
            setChannels(data.channelList);
            } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        console.log('MeteringPointInfo component mounted');
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
                <Typography>Created: {new Date(meteringPointInfo.createdAt).toLocaleString()}</Typography>
                <Typography>Status: {meteringPointInfo.deviceStatus}</Typography>
                <Typography>Type: {meteringPointInfo.deviceType}</Typography>
                <Typography>Updated: {new Date(meteringPointInfo.updatedAt).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom>Technical Specifications</Typography>
                <Typography>Serial Number: {meteringPointInfo.serialNumber}</Typography>
                <Typography>MeteringPoint Type: {meteringPointInfo.meteringPointType}</Typography>
                <Typography>MeteringPoint Name: {meteringPointInfo.meteringPointName}</Typography>
                <Typography>MeteringPoint Tag: {meteringPointInfo.meteringPointTag}</Typography>
                <Typography>Reading Interval (Seconds): {meteringPointInfo.readingIntervalInSeconds}</Typography>
            </Box>
            </Box>
        </Paper>

        <Typography variant="h5" gutterBottom>
            Channel List
        </Typography>
        
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Energy unit</TableCell>
                <TableCell>Power unit</TableCell>
                <TableCell>Lon Subchannel</TableCell>
                <TableCell>Lon is active?</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {channels.map((channel) => (
                <TableRow key={channel.channelId}>
                    <TableCell>{channel.channelNumber}</TableCell>
                    <TableCell>{channel.channelName}</TableCell>
                    <TableCell>{channel.channelMode}</TableCell>
                    <TableCell>{channel.energyUnit}</TableCell>
                    <TableCell>{channel.powerUnit}</TableCell>
                    <TableCell>{channel.lonSubChannel}</TableCell>
                    <TableCell>
                        <Chip 
                            label={channel.lonIsActiv ? "Activo" : "Inactivo"} 
                            color={channel.lonIsActiv ? "success" : "error"} 
                            size="small" 
                        /></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
    };

    export default MeteringPointInfo;



