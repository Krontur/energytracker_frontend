import { Box, List, ListItem, Button, ButtonGroup, ListItemText, IconButton, ListItemIcon, Modal, TextField } from '@mui/material';
import { Edit, Visibility, Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StationForm from './StationForm';
import useRoleCheck from '../../hooks/useRoleCheck';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const StationList = () => {
    const { isAdmin } = useRoleCheck();
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [filter, setFilter] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [selectedStation, setSelectedStation] = useState({});
    const [createStationModal, setCreateStationModal] = useState(false);

    const navigate = useNavigate();
    const { api } = useFetchWithAuth();

    useEffect(() => {
        handleFetchStations();
    }, []);

    useEffect(() => {
        if (showFilter) {
            const lowerCaseFilter = filter.toLowerCase();
            setFilteredStations(
                stations.filter((station) =>
                    station.stationTag.toLowerCase().includes(lowerCaseFilter)
                )
            );
        } else {
            setFilteredStations(stations);
        }
    }, [filter, stations, showFilter]);

    const handleFetchStations = async () => {
        try {
            const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/stations`);
            if (status === 200) {
                setStations(data);
                setFilteredStations(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        setCreateStationModal(false);
        handleFetchStations();
    };

    const toggleFilter = () => {
        if (showFilter) {
            setFilter('');
        }
        setShowFilter(!showFilter);
    };

    return (
        <Box
            sx={{
                p: 1,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto',
                alignItems: 'end',
            }}
        >
            <ButtonGroup
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'end',
                }}
            >
                <Button onClick={toggleFilter}>Filter</Button>
                {isAdmin() && (
                    <Button
                        onClick={() => {
                            setSelectedStation(null);
                            setCreateStationModal(true);
                        }}
                    >
                        New
                    </Button>
                )}
            </ButtonGroup>

            {showFilter && (
                <TextField
                    label="Filter by Station Tag"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            )}

            <List
                sx={{
                    width: '100%',
                    maxWidth: '1280px',
                    bgcolor: 'background.paper',
                }}
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Serial Number</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Station Name and Tag</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Station Type</Box>
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Reading Interval</Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '13%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        Actions
                    </Box>
                </ListItem>

                {filteredStations.map((station) => (
                    <ListItem
                        key={station.stationId}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '87%',
                            }}
                        >
                            <ListItemText
                                primary={station.serialNumber}
                                sx={{ flex: '1 1 20%', textAlign: 'left' }}
                            />
                            <ListItemText
                                primary={station.stationName}
                                secondary={station.stationTag}
                                sx={{ flex: '1 1 30%', textAlign: 'left' }}
                            />
                            <ListItemText
                                primary={station.stationType}
                                sx={{ flex: '1 1 30%', textAlign: 'left' }}
                            />
                            <ListItemText
                                primary={station.readingIntervalInSeconds}
                                sx={{ flex: '1 1 20%', textAlign: 'left' }}
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
                                    {isAdmin() && (
                                        <IconButton
                                            onClick={() => {
                                                setSelectedStation(station);
                                                setCreateStationModal(true);
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => {
                                            setSelectedStation(station);
                                            navigate(`/stations/${station.stationId}`);
                                        }}
                                    >
                                        <Visibility />
                                    </IconButton>
                                </ButtonGroup>
                            </ListItemIcon>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Modal open={createStationModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', md: '60%' },
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 24,
                        p: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton onClick={() => handleClose()} sx={{ alignSelf: 'flex-end' }}>
                        <Close />
                    </IconButton>
                    <StationForm onClose={handleClose} loadStation={selectedStation} />
                </Box>
            </Modal>
        </Box>
    );
};

export default StationList;
