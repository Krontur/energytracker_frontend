import { Box, TextField, Button, FormControl, InputLabel,
    FormHelperText, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MeterForm = ({ onClose, loadStation }) => {
    const [station, setStation] = useState({
        stationId: '',
        serialNumber: '',
        deviceType: 'STATION',
        deviceStatus: '',
        stationName: '',
        stationType: '',
        stationTag: '',
        readingIntervalInSeconds: 900,
    });

    useEffect(() => {
        if (loadStation != null) {
            // Filtrar solo las claves que existen en el estado inicial
            const filteredStation = Object.keys(station).reduce((acc, key) => {
                if (Object.prototype.hasOwnProperty.call(loadStation, key)) {
                    acc[key] = loadStation[key];
                }
                return acc;
            }, {});
            setStation((prevState) => ({ ...prevState, ...filteredStation }));
        }
    } , []);

    const [serialNumberError, setSerialNumberError] = useState(false);
    const [serialNumberErrorMessage, setSerialNumberErrorMessage] = useState('');
    const [deviceStatusError, setDeviceStatusError] = useState(false);
    const [stationNameError, setStationNameError] = useState(false);
    const [stationNameErrorMessage, setStationNameErrorMessage] = useState('');
    const [stationTypeError, setStationTypeError] = useState(false);
    const [stationTagError, setStationTagError] = useState(false);
    const [stationTagErrorMessage, setStationTagErrorMessage] = useState('');
    const [readingIntervalInSecondsError, setReadingIntervalInSecondsError] = useState(false);
    const [readingIntervalInSecondsErrorMessage, setReadingIntervalInSecondsErrorMessage] = useState('');

    async function handleSubmit (event) {
        event.preventDefault();
        console.log(station);
        if (validateForm()) {
            try {
                const url = station.stationId ? `http://localhost:8080/api/v1/stations/${station.stationId}` : `http://localhost:8080/api/v1/stations`;
                const method = station.stationId ? 'PATCH' : 'POST'; // Método HTTP

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(station),
                });
                if (response.ok) {
                    onClose();
                } else {
                    const errorData = await response.json();
                    console.error('Station creation failed ' + errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const validateFieldEmpty = (field) => {
        return !field;
    };

    const validateForm = () => {

        validateFieldEmpty(station.serialNumber) ? setSerialNumberError(true) : setSerialNumberError(false);
        validateFieldEmpty(station.deviceStatus) ? setDeviceStatusError(true) : setDeviceStatusError(false);
        validateFieldEmpty(station.stationName) ? setStationNameError(true) : setStationNameError(false);
        validateFieldEmpty(station.stationType) ? setStationTypeError(true) : setStationTypeError(false);
        validateFieldEmpty(station.stationTag) ? setStationTagError(true) : setStationTagError(false);

        if (station.readingIntervalInSeconds < 0) {
            setReadingIntervalInSecondsError(true);
            setReadingIntervalInSecondsErrorMessage('The Interval must be greater than 0 seconds');
        } else {
            setReadingIntervalInSecondsError(false);
        }

        return !(serialNumberError || deviceStatusError || stationNameError || stationTypeError ||
            stationTagError || readingIntervalInSecondsError );
    };

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
            <h2>{station.stationId ? "Edit Station" : "Create New Station"}</h2>
            <Box
                component="form"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' }, // 1 columna en pantallas pequeñas, 2 columnas en medianas y grandes
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '640px',
                    borderColor: 'primary.main',
                    borderRadius: 1,
                }}
            >
                
                <TextField
                    label="Station ID"
                    variant="outlined"
                    value={station.stationId}
                    disabled
                    fullWidth
                />

                <TextField
                    label="Serial Number"
                    variant="outlined"
                    value={station.serialNumber}
                    onChange={(e) => {
                        setStation({ ...station, serialNumber: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setSerialNumberError(true);
                            setSerialNumberErrorMessage('Serial number is required');
                         } else {
                            setSerialNumberError(false);
                         }
                    }}
                    required={true}
                    error={serialNumberError || undefined}
                    helperText={serialNumberErrorMessage}
                />

                <FormControl variant="outlined">
                    <InputLabel id="station-type-label">Station Type</InputLabel>
                    <Select
                        sx={{textAlign: 'left'}}
                        labelId="station-type-label"
                        id="station-type"
                        value={station.stationType}
                        onChange={(e) => {
                            setStation({ ...station, stationType: e.target.value })
                            validateFieldEmpty(e.target.value) ? setStationTypeError(true) : setStationTypeError(false)
                        }}
                        required={true}
                        error={stationTypeError}
                    >
                        <MenuItem value="U1601">U1601</MenuItem>
                        <MenuItem value="U1602">U1602</MenuItem>
                        <MenuItem value="U1603">U1603</MenuItem>
                        <MenuItem value="U1604">U1604</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: stationTypeError ? '#d32f2f' : '',
                        }}
                    >
                        Select the type of the station
                    </FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel id="connection-type-label">Station Status</InputLabel>
                    <Select
                        sx={{textAlign: 'left'}}
                        labelId="device-status-label"
                        id="device-status"
                        value={station.deviceStatus}
                        onChange={(e) => {
                            setStation({ ...station, deviceStatus: e.target.value })
                            validateFieldEmpty(e.target.value) ? setDeviceStatusError(true) : setDeviceStatusError(false)
                        }}
                        required={true}
                        error={deviceStatusError}
                    >
                        <MenuItem value="IN_STOCK">In Stock</MenuItem>
                        <MenuItem value="INSTALLED">Installed</MenuItem>
                        <MenuItem value="DEACTIVATED">Deactivated</MenuItem>
                        <MenuItem value="MANTEINANCE">Manteinance</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: deviceStatusError ? '#d32f2f' : '',
                        }}
                    >
                        Select the status of the station
                    </FormHelperText>
                </FormControl>

                <TextField
                    label="Station Name"
                    variant="outlined"
                    value={station.stationName}
                    onChange={(e) => {
                        setStation({ ...station, stationName: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setStationNameError(true);
                            setStationNameErrorMessage('Station name is required');
                         } else {
                            setStationNameError(false);
                         }
                    }}
                    required={true}
                    error={stationNameError || undefined}
                    helperText={stationNameErrorMessage}
                />

                <TextField
                    label="Station Tag"
                    value={station.stationTag}
                    onChange={(e) => {
                        setStation({ ...station, stationTag: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setStationTagError(true);
                            setStationTagErrorMessage('Station tag is required');
                         } else {
                            setStationTagError(false);
                         }
                    }}
                    required={true}
                    error={stationTagError || undefined}
                    helperText={stationTagErrorMessage}
                />

                <TextField
                    type="number"
                    label="Reading Interval"
                    value={station.readingIntervalInSeconds}
                    onChange={(e) => {
                        setStation({ ...station, readingIntervalInSeconds: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setReadingIntervalInSecondsError(true);
                            setReadingIntervalInSecondsErrorMessage('Reading Interval is required');
                        } else {
                            setReadingIntervalInSecondsError(false);
                        }
                    }}
                    disabled
                    required={true}
                    error={readingIntervalInSecondsError || undefined}
                    helperText={readingIntervalInSecondsErrorMessage}
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
MeterForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    loadStation: PropTypes.object,
};

export default MeterForm;