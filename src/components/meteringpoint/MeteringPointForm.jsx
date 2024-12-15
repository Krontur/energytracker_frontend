import { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, Autocomplete, Switch, FormLabel, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

const MeteringPointForm = ({ onClose, loadMeteringPoint }) => {

    const [meteringPoint, setMeteringPoint] = useState({
        meteringPointId: null,
        locationName: '',
        connectionDescription: '',
        parentMeteringPointId: null,
        energyMeterId: '',
        channelId: '',
        activeStatus: true,

    });

    const [selectedStation, setSelectedStation] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedMeteringPoint, setSelectedMeteringPoint] = useState(null);
    const [selectedMeter, setSelectedMeter] = useState(null);
    const [selectedParentMeteringPoint, setSelectedParentMeteringPoint] = useState(null);
    const [parentMeteringPoint, setParentMeteringPoint] = useState(null);
    const [stations, setStations] = useState([]);
    const [channels, setChannels] = useState([]);
    const [meteringPoints, setMeteringPoints] = useState([]);
    const [meters, setMeters] = useState([]);

    const [locationNameError, setLocationNameError] = useState(false);
    const [connectionDescriptionError, setConnectionDescriptionError] = useState(false);
    const [locationNameErrorMessage, setLocationNameErrorMessage] = useState('');
    const [connectionDescriptionErrorMessage, setConnectionDescriptionErrorMessage] = useState('');
    const [energyMeterError, setEnergyMeterError] = useState(false);
    const [stationError, setStationError] = useState(false);
    const [channelError, setChannelError] = useState(false);

    
    useEffect(() => {
        handleFetchStations();
        handleFetchEnergyMeters();
        handleFetchMeteringPoints();
    }, []);

    useEffect(() => {
        if (loadMeteringPoint && meters && stations && channels && meteringPoints) {
            const loadedMeter = loadMeteringPoint.energyMeter;
            const loadedChannel = loadMeteringPoint.channel;
            const loadedStation = stations.find((station) => station.stationId === loadedChannel?.stationId);
            const loadedParentMeteringPoint = meteringPoints.find((mp) => mp.meteringPointId === loadMeteringPoint.parentMeteringPointId);
    
            setSelectedMeter(loadedMeter || null);
            setSelectedChannel(loadedChannel || null);
            setSelectedStation(loadedStation || null);
            setSelectedParentMeteringPoint(loadedParentMeteringPoint || null);
            setSelectedMeteringPoint(loadedParentMeteringPoint || null);
            setMeteringPoint({
                meteringPointId: loadMeteringPoint.meteringPointId || null,
                locationName: loadMeteringPoint.locationName || '',
                connectionDescription: loadMeteringPoint.connectionDescription || '',
                parentMeteringPointId: loadMeteringPoint.parentMeteringPointId || null,
                energyMeterId: loadMeteringPoint.energyMeter?.energyMeterId || '',
                channelId: loadMeteringPoint.channel?.channelId || '',
                activeStatus: loadMeteringPoint.activeStatus || true,
            });
    
            console.log(meteringPoint);
        }
    }, [loadMeteringPoint, meters, stations, channels, meteringPoints]);

    const validateFieldEmpty = (field) => {
        return field === '';
    }

    const validateForm = () => {
        let isFormValid = true
        if (validateFieldEmpty(meteringPoint.locationName)){
            setLocationNameError(validateFieldEmpty(meteringPoint.locationName));
            setLocationNameErrorMessage('Location Name is required');
            isFormValid = false
        }
        if (validateFieldEmpty(meteringPoint.connectionDescription)){
            setConnectionDescriptionError(validateFieldEmpty(meteringPoint.connectionDescription));
            setConnectionDescriptionErrorMessage('Connection Description is required');
            isFormValid = false
        }
        if (!selectedMeter){
            setEnergyMeterError(true);
            isFormValid = false;
        }
        if (!selectedStation){
            setStationError(true);
            isFormValid = false;
        }
        if (!selectedChannel){
            setChannelError(true);
            isFormValid = false;
        }

        return isFormValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            handleCreateMeteringPoint();
            console.log(meteringPoint);
        }
    }

    const handleCreateMeteringPoint = async () => {
        try {
            const url = meteringPoint.meteringPointId ? `http://localhost:8080/api/v1/metering-points/${meteringPoint.meteringPointId}` : `http://localhost:8080/api/v1/metering-points`;
            const method = meteringPoint.meteringPointId ? 'PATCH' : 'POST'; 

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meteringPoint),
            });
            if (!response.ok) {
                const errorResponse = await response.json().catch(() => {
                    throw new Error('Error creating Metering Point');
                });
                console.error('Server error: ', errorResponse);
                return;
            }
            const data = await response.json();
            console.log(data);
            onClose();
            handleFetchMeteringPoints();
        } catch (error) {
            console.error('Error creating Metering Point: ', error);
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

    const handleFetchEnergyMeters = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/meters');
            const data = await response.json();
            setMeters(data);
            } catch (error) {
                console.error('Error:', error);
            }
    }

    const handleFetchMeteringPoints = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/metering-points');
            const data = await response.json();
            setMeteringPoints(data);
            } catch (error) {
                console.error('Error:', error);
            }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
                padding: '1rem',
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                margin: '2rem',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <h2>{ meteringPoint.meteringPointId == null ? "Create Metering Point" : "Edit Metering Point"}</h2>
            <Box
                component="form"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' },
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '640px',
                    borderColor: 'primary.main',
                    borderRadius: 1,
                }}
            >
                
                <TextField
                    label="MeteringPoint ID"
                    variant="outlined"
                    value={meteringPoint.meteringPointId}
                    disabled
                    fullWidth
                />

                <TextField
                    label="Location Name"
                    variant="outlined"
                    value={meteringPoint.locationName}
                    onChange={(e) => {
                        setMeteringPoint({ ...meteringPoint, locationName: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setLocationNameError(true);
                            setLocationNameErrorMessage('Location Name is required');
                         } else {
                            setLocationNameError(false);
                         }
                    }}
                    required={true}
                    error={locationNameError || undefined}
                    helperText={locationNameErrorMessage}
                />

                <TextField
                    label="Connection Description"
                    value={meteringPoint.connectionDescription}
                    onChange={(e) => {
                        setMeteringPoint({ ...meteringPoint, connectionDescription: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setConnectionDescriptionError(true);
                            setConnectionDescriptionErrorMessage('Connection Description is required');
                         } else {
                            setConnectionDescriptionError(false);
                         }
                    }}
                    required={true}
                    error={connectionDescriptionError || undefined}
                    helperText={connectionDescriptionErrorMessage}
                />

                <FormControl variant="outlined">
                    <FormLabel component="legend">Metering Point active?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                type="checkbox"
                                checked={meteringPoint.activeStatus}
                                onChange={(e) => setMeteringPoint({ ...meteringPoint, activeStatus: e.target.checked })}
                                required={true}
                            />
                        }
                        label="Active"
                    />
                </FormControl>

                <Autocomplete
                    options={meters.filter((meter) => meter.deviceStatus === 'IN_STOCK').sort((a, b) => a.serialNumber.localeCompare(b.serialNumber))}
                    getOptionLabel={(option) => option.serialNumber || ''}
                    value={selectedMeter}
                    inputValue={selectedMeter?.serialNumber || ''}
                    onChange={(event, newValue) => {
                        if (!newValue) {
                            setMeteringPoint({ ...meteringPoint, energyMeterId: newValue.energyMeterId });
                            setSelectedMeter(newValue);
                            setEnergyMeterError(false);
                        } else {
                            setEnergyMeterError(true);
                        }
                    }}
                    renderInput={(params) => 
                        <TextField
                            {...params}
                            label="Select Meter"
                            variant="outlined"
                            error={energyMeterError || ''}
                        />}
                />

                <Autocomplete
                    options={stations.filter((station) => station.deviceStatus === 'INSTALLED').sort((a, b) => a.stationTag.localeCompare(b.stationTag))}
                    getOptionLabel={(option) => option.stationTag || ''}
                    value={selectedStation}
                    inputValue={selectedStation?.stationTag || ''}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSelectedStation(newValue);
                            setChannels(newValue.channelList);
                            setStationError(false);
                        } else {
                            setSelectedStation({});
                            setStationError(true);
                        }
                    }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Select Station"
                            variant="outlined"
                            error={stationError || ''}
                        />}
                />

                <Autocomplete
                    disabled={!channels || channels.length === 0}
                    options={channels.filter((channel) => channel.lonIsActive === false).sort((a, b) => a.channelNumber - b.channelNumber)}
                    getOptionLabel={(option) => option.channelNumber?.toString() || ''}
                    value={selectedChannel}
                    inputValue={selectedChannel?.channelNumber?.toString() || ''}
                    onChange={(event, newValue) => {
                        if (!newValue) {
                            setChannelError(true);
                        } else {
                            setMeteringPoint({ ...meteringPoint, channelId: newValue.channelId });
                            setSelectedChannel(newValue);
                            setChannelError(false);
                        }
                    }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Select Channel"
                            variant="outlined"
                            error={channelError || ''}
                        />}
                />

                <Autocomplete
                    options={meteringPoints}
                    getOptionLabel={(option) => option.meteringPointId?.toString() || ''}
                    value={selectedMeteringPoint}
                    onChange={(event, newValue) => {
                        setParentMeteringPoint({ ...meteringPoint, parentMeteringPointId: newValue.meteringPointId });
                        setSelectedParentMeteringPoint(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Parent Metering Point" variant="outlined" />}
                />
                        

                <Button
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                    sx={{ gridColumn: 'span 2' }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );

}

MeteringPointForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    loadMeteringPoint: PropTypes.object,
}

export default MeteringPointForm;
