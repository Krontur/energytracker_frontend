import { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, IconButton, List, ListItem, ListItemText, Modal, ListItemIcon, FormControlLabel, Switch, TextField } from '@mui/material';
import { Edit, Visibility, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MeteringPointForm from './MeteringPointForm';
import useRoleCheck from '../../hooks/useRoleCheck';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const MeteringPointList = () => {
    const { isAdmin } = useRoleCheck();
    const [meteringPoints, setMeteringPoints] = useState([]);
    const [stations, setStations] = useState([]);
    const [filteredMeteringPoints, setFilteredMeteringPoints] = useState([]);
    const [filters, setFilters] = useState({ serialNumber: '', stationTag: '', channel: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMeteringPoint, setSelectedMeteringPoint] = useState({});
    const [createMeteringPointModal, setCreateMeteringPointModal] = useState(false);

    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';
    const navigate = useNavigate();
    const { api } = useFetchWithAuth();

    useEffect(() => {
        handleFetchMeteringPoints();
        handleFetchStations();
    }, []);

    useEffect(() => {
        if (showFilters) {
            const lowerCaseSerial = filters.serialNumber.toLowerCase();
            const lowerCaseTag = filters.stationTag.toLowerCase();
            const channelFilter = filters.channel;
            setFilteredMeteringPoints(
                meteringPoints.filter(
                    (point) =>
                        point.energyMeter.serialNumber.toLowerCase().includes(lowerCaseSerial) &&
                        stations.find((station) => station.stationId === point.channel.stationId)?.stationTag
                            ?.toLowerCase()
                            .includes(lowerCaseTag) &&
                        point.channel.channelNumber.toString().includes(channelFilter)
                )
            );
        } else {
            setFilteredMeteringPoints(meteringPoints);
        }
    }, [filters, meteringPoints, stations, showFilters]);

    const handleFetchMeteringPoints = async () => {
        try {
            const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/metering-points`);
            if (status === 200) {
                setMeteringPoints(data);
                setFilteredMeteringPoints(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFetchStations = async () => {
        try {
            const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/stations`);
            if (status === 200) {
                setStations(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        setCreateMeteringPointModal(false);
        handleFetchMeteringPoints();
    };

    const toggleFilters = () => {
        if (showFilters) {
            setFilters({ serialNumber: '', stationTag: '', channel: '' });
        }
        setShowFilters(!showFilters);
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
                <Button onClick={toggleFilters}>Filter</Button>
                {isAdmin() && (
                    <Button
                        onClick={() => {
                            setSelectedMeteringPoint(null);
                            setCreateMeteringPointModal(true);
                        }}
                    >
                        New
                    </Button>
                )}
            </ButtonGroup>

            {showFilters && (
                <Box sx={{ display: 'flex', gap: 2, margin: '16px 0' }}>
                    <TextField
                        label="Filter by Serial Number"
                        variant="outlined"
                        fullWidth
                        value={filters.serialNumber}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, serialNumber: e.target.value }))
                        }
                    />
                    <TextField
                        label="Filter by Station Tag"
                        variant="outlined"
                        fullWidth
                        value={filters.stationTag}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, stationTag: e.target.value }))
                        }
                    />
                    <TextField
                        label="Filter by Channel"
                        variant="outlined"
                        fullWidth
                        value={filters.channel}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, channel: e.target.value }))
                        }
                    />
                </Box>
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Metering Point</Box>
                        <Box sx={{ flex: '1 1 35%', textAlign: 'left' }}>Energy Meter Serial Number</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Station Tag</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Channel</Box>
                        <Box sx={{ flex: '1 1 15%', textAlign: 'left' }}>Status</Box>
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

                {filteredMeteringPoints.map((meteringPoint) => (
                    <ListItem
                        key={meteringPoint.meteringPointId}
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
                                primary={meteringPoint.meteringPointId}
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={meteringPoint.energyMeter.serialNumber}
                                sx={{
                                    flex: '1 1 35%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={stations.find((station) => station.stationId === meteringPoint.channel.stationId)?.stationTag}
                                sx={{
                                    flex: '1 1 15%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={meteringPoint.channel.channelNumber}
                                sx={{
                                    flex: '1 1 15%',
                                    textAlign: 'left',
                                }}
                            />
                            <FormControlLabel
                                sx={{
                                    flex: '1 1 15%',
                                    textAlign: 'left',
                                }}
                                control={
                                    <Switch type="checkbox" checked={meteringPoint.activeStatus} disabled />
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
                                    {isAdmin() && (
                                        <IconButton
                                            onClick={() => {
                                                setSelectedMeteringPoint(meteringPoint);
                                                setCreateMeteringPointModal(true);
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => {
                                            setSelectedMeteringPoint(meteringPoint);
                                            navigate(`/metering-points/${meteringPoint.meteringPointId}`);
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
            <Modal open={createMeteringPointModal}>
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
                    <MeteringPointForm onClose={handleClose} loadMeteringPoint={selectedMeteringPoint} />
                </Box>
            </Modal>
        </Box>
    );
};

export default MeteringPointList;
