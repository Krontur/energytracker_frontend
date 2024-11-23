import { Box, List, ListItem, Button, ButtonGroup, ListItemText, IconButton, ListItemIcon, Modal } from "@mui/material"
import { Delete, Edit, Visibility, Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StationForm from "./StationForm"


const StationList = () => {

    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState({});
    const [createStationModal, setCreateStationModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleFetchStations();
    }, []);

    const handleClose = () => {
        setCreateStationModal(false);
        handleFetchStations();
    }


    const handleFetchStations = async () => {
        try {
            const response = await fetch('http://localhost:8088/api/v1/stations',
                {
                method: 'GET',
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setStations(data);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
            }} catch (error) {
                console.error('Error:', error);
            }}


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
                    onClick={() => setCreateStationModal(true)}
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
                        backgroundColor: 'primary.light',
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Serial number</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Stations Name and Tag</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Station Type</Box>
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Reading Interval (Seconds)</Box>
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

            {stations.map((station) => (
                <ListItem key={station.stationId}
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
                        <ListItemText primary={station.serialNumber}
                            sx={{ 
                                flex: '1 1 20%', 
                                textAlign: 'left' 
                            }}
                        />
                        <ListItemText primary={station.stationName} secondary={station.stationTag}
                            sx={{ 
                                flex: '1 1 30%', 
                                textAlign: 'left' 
                            }}
                        />
                        <ListItemText primary={station.stationType}
                            sx={{ 
                                flex: '1 1 30%', 
                                textAlign: 'left' 
                            }}
                        />
                        <ListItemText primary={station.readingIntervalInSeconds}
                            sx={{ 
                                flex: '1 1 20%', 
                                textAlign: 'left' 
                            }}
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
                                    <IconButton onClick={() => console.log(station.stationId)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => console.log(station.stationId)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() =>
                                        {
                                            setSelectedStation(station);
                                            console.log(station);
                                            navigate(`/stations/${station.stationId}`);
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
            <Modal open={createStationModal} >
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
                    <StationForm onClose={handleClose}/>
                </Box>
            </Modal>
        </Box>

    );
}

export default StationList;