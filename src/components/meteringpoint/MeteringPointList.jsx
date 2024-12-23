import { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, IconButton, List, ListItem, ListItemText, Modal, ListItemIcon, FormControlLabel, Switch } from '@mui/material';
import { Delete, Edit, Visibility, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MeteringPointForm from './MeteringPointForm';

const MeteringPointList = () => {

    const [meteringPoints, setMeteringPoints] = useState([]);
    const [stations, setStations] = useState([]);
    const [selectedMeteringPoint, setSelectedMeteringPoint] = useState({});
    const [createMeteringPointModal, setCreateMeteringPointModal] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        handleFetchMeteringPoints();
        handleFetchStations();
    }, []);

    const handleFetchMeteringPoints = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/metering-points',
                {
                method: 'GET',
                }
            );
            if(response.ok) {
                const data = await response.json();
                setMeteringPoints(data);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleFetchStations = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/stations');
            const data = await response.json();
            setStations(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handleClose = () => {
        setCreateMeteringPointModal(false);
        handleFetchMeteringPoints();
    }

    return (
        <Box
            sx={{  p: 1,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1, 
                backgroundColor: 'background.paper',
                width: '100%',
                maxWidth:'1280px',
                margin: '0 auto',
                alignItems: 'end'
            }}
        >
            <ButtonGroup sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'end'
            }}>
                <Button
                    onClick={() => {
                        setSelectedMeteringPoint(null)
                        setCreateMeteringPointModal(true)
                    }}
                >new</Button>                
            </ButtonGroup>
            <List
                sx={{ width: '100%', 
                      maxWidth: '1280px',
                      bgcolor: 'background.paper' }}
            >
                <ListItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        width: '100%',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #ccc', 
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: '87%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Metering Point</Box>
                        <Box sx={{ flex: '1 1 35%', textAlign: 'left' }}>Energymeter Serialnumber</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Station Tag</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Channel</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Status</Box>
                    </Box>
                    <Box sx={{
                                display: 'flex',
                                width: '13%',
                                justifyContent: 'flex-start',
                            }}
                    >
                        Actions
                    </Box>
                </ListItem>

            {meteringPoints.map((meteringPoint) => (
                <ListItem key={meteringPoint.meteringPointId}
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={
                            {
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '87%',
                            }
                        }
                    >
                        <ListItemText primary={meteringPoint.meteringPointId}
                            sx={{ 
                                flex: '1 1 20%', 
                                textAlign: 'left' 
                            }}
                        />
                        <ListItemText primary={meteringPoint.energyMeter.serialNumber}
                            sx={{ 
                                flex: '1 1 35%', 
                                textAlign: 'left' 
                            }}
                        />
                        <ListItemText primary={stations.find((station) => station.stationId  === meteringPoint.channel.stationId)?.stationTag}
                            sx={{ 
                                flex: '1 1 15%', 
                                textAlign: 'left' 
                            }}
                        />
                        
                        <ListItemText primary={meteringPoint.channel.channelNumber}
                            sx={{ 
                                flex: '1 1 15%', 
                                textAlign: 'left' 
                            }}
                        />
                        <FormControlLabel
                                sx={{ 
                                    flex: '1 1 15%', 
                                    textAlign: 'left' 
                                }}
                                control={
                                    <Switch
                                        type="checkbox"
                                        checked={meteringPoint.activeStatus}
                                    />
                                }
                                label="Active"
                            />
                    </Box>
                    <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '13%',
                                padding: '0 auto',
                            }}
                        >
                            <ListItemIcon>
                                <ButtonGroup>
                                    <IconButton onClick={() => console.log(meteringPoint.meteringPointId)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setSelectedMeteringPoint(meteringPoint);
                                        setCreateMeteringPointModal(true);
                                    }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() =>
                                        {
                                            setSelectedMeteringPoint(meteringPoint);
                                            navigate(`/metering-points/${meteringPoint.meteringPointId}`);
                                        }
                                    }>
                                        <Visibility />
                                    </IconButton>
                                </ButtonGroup>
                            </ListItemIcon>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Modal open={createMeteringPointModal} >
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
                    <MeteringPointForm onClose={handleClose} loadMeteringPoint={selectedMeteringPoint}/>
                </Box>
            </Modal>
        </Box>
    );
}

export default MeteringPointList;