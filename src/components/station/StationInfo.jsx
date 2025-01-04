import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Chip, IconButton, Modal } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Edit from '@mui/icons-material/Edit';
import Close from '@mui/icons-material/Close';
import ChannelForm from '../Channel/ChannelForm'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const StationInfo = () => {

    const { id } = useParams();
    const { api } = useFetchWithAuth();

    const [stationInfo, setStationInfo] = useState({});
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [createChannelModal, setCreateChannelModal] = useState(false);


    const handleFetchStationInfo = async () => {
        try {
        const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/stations/${id}`);
            if(status === 200) {
            setStationInfo(data);
            setChannels(data.channelList);
            } else {
            console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        console.log('StationInfo component mounted');
        handleFetchStationInfo();
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    
    const handleClose = () => {
        setCreateChannelModal(false);
        handleFetchStationInfo();
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
            Station Information
            </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom>Device Details</Typography>
                <Typography>ID: {stationInfo.stationId}</Typography>
                <Typography>Created: {new Date(stationInfo.createdAt).toLocaleString()}</Typography>
                <Typography>Status: {stationInfo.deviceStatus}</Typography>
                <Typography>Type: {stationInfo.deviceType}</Typography>
                <Typography>Updated: {new Date(stationInfo.updatedAt).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h6" gutterBottom>Technical Specifications</Typography>
                <Typography>Serial Number: {stationInfo.serialNumber}</Typography>
                <Typography>Station Type: {stationInfo.stationType}</Typography>
                <Typography>Station Name: {stationInfo.stationName}</Typography>
                <Typography>Station Tag: {stationInfo.stationTag}</Typography>
                <Typography>Reading Interval (Seconds): {stationInfo.readingIntervalInSeconds}</Typography>
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
                {channels.toSorted((a, b) => a.channelId - b.channelId).map((channel) => (
                <TableRow key={channel.channelId}>
                    <TableCell>{channel.channelNumber}</TableCell>
                    <TableCell>{channel.channelName}</TableCell>
                    <TableCell>{channel.channelMode}</TableCell>
                    <TableCell>{channel.energyUnit}</TableCell>
                    <TableCell>{channel.powerUnit}</TableCell>
                    <TableCell>{channel.lonSubChannel}</TableCell>
                    <TableCell>
                        <Chip 
                            label={channel.lonIsActive ? "Activo" : "Inactivo"} 
                            color={channel.lonIsActive ? "success" : "error"} 
                            size="small" 
                        /></TableCell>
                    <TableCell>
                        <IconButton onClick={() => {
                            setSelectedChannel(channel);
                            setCreateChannelModal(true);
                        }}>
                            <Edit />
                        </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Modal open={createChannelModal} >
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs:'90%', md: '60%'},
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <IconButton onClick={() => handleClose()} sx={{ alignSelf:'flex-end'}}>
                        <Close />
                    </IconButton>
                    <ChannelForm onClose={handleClose} loadChannel={selectedChannel}/>
                </Box>
            </Modal>
        </Container>
    );
    };

    export default StationInfo;



