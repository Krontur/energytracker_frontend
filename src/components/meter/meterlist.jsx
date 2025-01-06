import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, ButtonGroup, Button, Modal, TextField } from '@mui/material';
import { Edit, Visibility, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MeterForm from './MeterForm';
import useRoleCheck from '../../hooks/useRoleCheck';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const MeterList = () => {
    const { isAdmin } = useRoleCheck();
    const navigate = useNavigate();
    const { api } = useFetchWithAuth();

    const [meters, setMeters] = useState([]);
    const [filteredMeters, setFilteredMeters] = useState([]);
    const [filters, setFilters] = useState({ serialNumber: '', midApprovalYear: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedMeter, setSelectedMeter] = useState({});
    const [createMeterModal, setCreateMeterModal] = useState(false);

    useEffect(() => {
        handleFetchMeters();
    }, []);

    useEffect(() => {
        if (showFilters) {
            const lowerCaseSerial = filters.serialNumber.toLowerCase();
            const yearFilter = filters.midApprovalYear;
            setFilteredMeters(
                meters.filter(
                    (meter) =>
                        meter.serialNumber.toLowerCase().includes(lowerCaseSerial) &&
                        meter.midApprovalYear.toString().includes(yearFilter)
                )
            );
        } else {
            setFilteredMeters(meters);
        }
    }, [filters, meters, showFilters]);

    const handleFetchMeters = async () => {
        try {
            const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/meters`);
            if (status === 200) {
                setMeters(data);
                setFilteredMeters(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        setCreateMeterModal(false);
        handleFetchMeters();
    };

    const toggleFilters = () => {
        if (showFilters) {
            setFilters({ serialNumber: '', midApprovalYear: '' });
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
                            setSelectedMeter(null);
                            setCreateMeterModal(true);
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
                        label="Filter by MID Approval Year"
                        variant="outlined"
                        fullWidth
                        value={filters.midApprovalYear}
                        onChange={(e) =>
                            setFilters((prev) => ({ ...prev, midApprovalYear: e.target.value }))
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Serial Number</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Connection Type and Address</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>MID Approval Year</Box>
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Created Date</Box>
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

                {filteredMeters.map((meter) => (
                    <ListItem
                        key={meter.energyMeterId}
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
                                primary={meter.serialNumber}
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={meter.connectionType}
                                secondary={meter.connectionAddress}
                                sx={{
                                    flex: '1 1 30%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={meter.midApprovalYear}
                                sx={{
                                    flex: '1 1 30%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText
                                primary={meter.createdAt}
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
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
                                    {isAdmin() && (
                                        <IconButton
                                            onClick={() => {
                                                setSelectedMeter(meter);
                                                setCreateMeterModal(true);
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => {
                                            setSelectedMeter(meter);
                                            navigate(`/meters/${meter.energyMeterId}`);
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
            <Modal open={createMeterModal}>
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
                    <MeterForm onClose={handleClose} loadMeter={selectedMeter} />
                </Box>
            </Modal>
        </Box>
    );
};

export default MeterList;
