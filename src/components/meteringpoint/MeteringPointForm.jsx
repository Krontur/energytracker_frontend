import { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, Autocomplete, Switch, FormLabel, FormControlLabel } from '@mui/material';

const MeteringPointForm = () => {

    const [meteringPoint, setMeteringPoint] = useState({});
    const [locationName, setLocationName] = useState('');
    const [connectionDescription, setConnectionDescription] = useState('');
    const [activeStatus, setActiveStatus] = useState(false);
    const [selectedStation, setSelectedStation] = useState({});
    const [selectedChannel, setSelectedChannel] = useState({});
    const [selectedMeteringPoint, setSelectedMeteringPoint] = useState({});
    const [selectedMeter, setSelectedMeter] = useState({});
    const [stations, setStations] = useState([]);
    const [channels, setChannels] = useState([]);
    const [meteringpoints, setMeteringPoints] = useState([]);
    const [meters, setMeters] = useState([]);

    const [locationNameError, setLocationNameError] = useState(false);
    const [connectionDescriptionError, setConnectionDescriptionError] = useState(false);
    const [locationNameErrorMessage, setLocationNameErrorMessage] = useState('');
    const [connectionDescriptionErrorMessage, setConnectionDescriptionErrorMessage] = useState('');

    useEffect(() => {
        handleFetchStations();
        handleFetchEnergyMeters();
        handleFetchMeteringPoints();
    }, []);

    const validateFieldEmpty = (field) => {
        return field === '';
    }

    const validateForm = () => {
        return validateFieldEmpty(locationName) || validateFieldEmpty(connectionDescription);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
                console.log(meteringPoint);
                console.log(locationName);
                console.log(connectionDescription);
                console.log(activeStatus);
                console.log(selectedStation);
                console.log(selectedChannel);
                setMeteringPoint({
                    locationName: locationName,
                    connectionDescription: connectionDescription,
                    activeStatus: activeStatus,
                    station: selectedStation,
                    channel: selectedChannel
                    });
            }
            else {
                alert('Please fill in all fields');
                }
    }

    const handleFetchStations = async () => {
        try {
            const response = await fetch('http://localhost:8088/api/v1/stations');
            const data = await response.json();
            console.log(data);
            setStations(data);
            } catch (error) {
                console.error('Error:', error);
            }
    }

    const handleFetchEnergyMeters = async () => {
        try {
            const response = await fetch('http://localhost:8088/api/v1/meters');
            const data = await response.json();
            setMeters(data);
            } catch (error) {
                console.error('Error:', error);
            }
    }

    const handleFetchMeteringPoints = async () => {
        try {
            const response = await fetch('http://localhost:8088/api/v1/metering-points');
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
            <h2>Create Metering Point</h2>
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
                        setLocationName({ ...meteringPoint, locationName: e.target.value })
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
                        setConnectionDescription({ ...meteringPoint, connectionDescription: e.target.value })
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
                                onChange={(e) => setActiveStatus({ ...meteringPoint, activeStatus: e.target.checked })}
                                required={true}
                            />
                        }
                        label="Active"
                    />
                </FormControl>

                <Autocomplete
                    options={meters}
                    getOptionLabel={(option) => option.serialNumber || ''}
                    value={selectedMeter}
                    onChange={(event, newValue) => {
                        setSelectedMeter(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Meter" variant="outlined" />}
                />

                <Autocomplete
                    options={stations}
                    getOptionLabel={(option) => option.stationTag || ''}
                    value={selectedStation}
                    onChange={(event, newValue) => {
                        setSelectedStation(newValue);
                        setChannels(newValue.channelList);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Station" variant="outlined" />}
                />

                <Autocomplete
                    options={channels}
                    getOptionLabel={(option) => option.channelNumber || ''}
                    value={selectedChannel}
                    onChange={(event, newValue) => {
                        setSelectedChannel(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Channel" variant="outlined" />}
                />

                <Autocomplete
                    options={meteringpoints}
                    getOptionLabel={(option) => option.meteringPointId || ''}
                    value={selectedMeteringPoint}
                    onChange={(event, newValue) => {
                        setSelectedMeteringPoint(newValue);
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

export default MeteringPointForm;
