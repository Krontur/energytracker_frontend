import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, ButtonGroup, Button } from '@mui/material';
import { Edit, Visibility, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MeterForm from './meterform';
import Modal from '@mui/material/Modal';
import useRoleCheck from '../../hooks/useRoleCheck';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const MeterList = () => {
    const { isAdmin } = useRoleCheck();
    const navigate = useNavigate();
    const { api } = useFetchWithAuth();

    const [meters, setMeters] = useState([]);
    const [selectedMeter, setSelectedMeter] = useState({});

    useEffect(() => {
        handleFetchMeters();
    } , []);
    
    const handleClose = () => {
        setCreateMeterModal(false);
        handleFetchMeters();
    };

    const handleFetchMeters = async () => {
        console.log('fetching meters');
        try {
            const { data, status} = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/meters`);
            if (status === 200) {
                console.log(data);
                setMeters(data);
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const [ createMeterModal, setCreateMeterModal ] = useState(false);

    return (
        <Box sx={{  p: 1,
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: 1, 
                    backgroundColor: 'background.paper',
                    width: '100%',
                    maxWidth:'1280px',
                    margin: '0 auto',
                    alignItems: 'end',
                }}>
            { isAdmin() && (
                <ButtonGroup sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'end'
                }}>
                    <Button
                        onClick={() => {
                            setSelectedMeter(null)
                            setCreateMeterModal(true)
                        }}
                    >new</Button>                
                </ButtonGroup>
            )}
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
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Serial number</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>Connection Type and Address</Box>
                        <Box sx={{ flex: '1 1 30%', textAlign: 'left' }}>MID Approval Year</Box>
                        <Box sx={{ flex: '1 1 20%', textAlign: 'left' }}>Created Date</Box>
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

                {meters.map((meter) => (
                    <ListItem key={meter.energyMeterId}
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
                            <ListItemText primary={meter.serialNumber}
                                sx={{
                                    flex: '1 1 20%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={meter.connectionType} secondary={meter.connectionAddress}
                                sx={{
                                    flex: '1 1 30%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={meter.midApprovalYear} 
                                sx={{
                                    flex: '1 1 30%',
                                    textAlign: 'left',
                                }}
                            />
                            <ListItemText primary={meter.createdAt} 
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
                                    { isAdmin() && (
                                            <IconButton onClick={() => {
                                                setSelectedMeter(meter)
                                                setCreateMeterModal(true)

                                            }}>
                                                <Edit />
                                            </IconButton>
                                    )}
                                    <IconButton onClick={() =>
                                        {
                                            setSelectedMeter(meter);
                                            console.log(selectedMeter);
                                            navigate(`/meters/${meter.energyMeterId}`);
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
            <Modal open={createMeterModal} >
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
                    <MeterForm onClose={handleClose} loadMeter={selectedMeter}/>
                </Box>
            </Modal>
        </Box>
    );
}

export default MeterList;