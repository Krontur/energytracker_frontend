import { Box, TextField, Button, FormControl, InputLabel,
    FormHelperText, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const MeterForm = ({ onClose }) => {
    const [meter, setMeter] = useState({
        energyMeterId: '',
        serialNumber: '',
        deviceType: 'ENERGY_METER',
        deviceStatus: 'IN_STOCK',
        createdAt: '',
        updatedAt: '',
        connectionAddress: '',
        connectionType: '',
        energyMeterType: '',
        maxCurrent: 0,
        referenceVoltage: 0,
        midApprovalYear: 0,
    });

    const [serialNumberError, setSerialNumberError] = useState(false);
    const [serialNumberErrorMessage, setSerialNumberErrorMessage] = useState('');
    const [connectionTypeError, setConnectionTypeError] = useState(false);
    const [energyMeterTypeError, setEnergyMeterTypeError] = useState(false);
    const [maxCurrentError, setMaxCurrentError] = useState(false);
    const [maxCurrentErrorMessage, setMaxCurrentErrorMessage] = useState('');
    const [referenceVoltageError, setReferenceVoltageError] = useState(false);
    const [referenceVoltageErrorMessage, setReferenceVoltageErrorMessage] = useState('');
    const [midApprovalYearError, setMidApprovalYearError] = useState(false);
    const [midApprovalYearErrorMessage, setMidApprovalYearErrorMessage] = useState('');
    const [connectionAddressError, setConnectionAddressError] = useState(false);
    const [connectionAddressErrorMessage, setConnectionAddressErrorMessage] = useState('');

    async function handleSubmit (event) {
        event.preventDefault();
        console.log(meter);
        if (validateForm()) {
            console.log('Form is valid');
            try {
                const response = await fetch('http://localhost:8088/api/v1/meters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meter),
                });
                if (response.ok) {
                    console.log('Meter created successfully');
                    onClose();
                } else {
                    const errorData = await response.json();
                    console.error('Meter creation failed ' + errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        console.log('Form is invalid');
    };

    const validateFieldEmpty = (field) => {
        return !field;
    };

    const validateForm = () => {

        console.log('Validating form');
        console.log('Serial number error: ' + serialNumberError);
        console.log('Serial number error message: ' + serialNumberErrorMessage);
        console.log('Connection type error: ' + connectionTypeError);
        console.log('Energy meter type error: ' + energyMeterTypeError);
        console.log('Max current error: ' + maxCurrentError);
        console.log('Reference voltage error: ' + referenceVoltageError);
        console.log('MID approval year error: ' + midApprovalYearError);
        console.log('Connection address error: ' + connectionAddressError);
        console.log(serialNumberError || connectionTypeError || energyMeterTypeError || maxCurrentError ||
            referenceVoltageError || midApprovalYearError || connectionAddressError);

        return !(serialNumberError || connectionTypeError || energyMeterTypeError || maxCurrentError ||
        referenceVoltageError || midApprovalYearError || connectionAddressError);
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
            <h2>Create New Energy Meter</h2>
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
                {/* Campo para el ID del medidor, ocupa las dos columnas */}
                <TextField
                    label="Energy Meter ID"
                    variant="outlined"
                    value={meter.energyMeterId}
                    disabled
                    fullWidth
                />

                {/* Número de serie */}
                <TextField
                    label="Serial Number"
                    variant="outlined"
                    value={meter.serialNumber}
                    onChange={(e) => {
                        setMeter({ ...meter, serialNumber: e.target.value })
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

                {/* Tipo de medidor */}
                <FormControl variant="outlined">
                    <InputLabel id="energy-meter-type-label">Energy Meter Type</InputLabel>
                    <Select
                        labelId="energy-meter-type-label"
                        id="energy-meter-type"
                        value={meter.energyMeterType}
                        onChange={(e) => {
                            setMeter({ ...meter, energyMeterType: e.target.value })
                            validateFieldEmpty(e.target.value) ? setEnergyMeterTypeError(true) : setEnergyMeterTypeError(false)
                        }}
                        required={true}
                        error={energyMeterTypeError}
                    >
                        <MenuItem value="DIGITAL">Digital</MenuItem>
                        <MenuItem value="ANALOG">Analog</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: energyMeterTypeError ? '#d32f2f' : '',
                        }}
                    >
                        Select the type of the meter
                    </FormHelperText>
                </FormControl>

                {/* Tipo de conexión */}
                <FormControl variant="outlined">
                    <InputLabel id="connection-type-label">Connection Type</InputLabel>
                    <Select
                        labelId="connection-type-label"
                        id="connection-type"
                        value={meter.connectionType}
                        onChange={(e) => {
                            setMeter({ ...meter, connectionType: e.target.value })
                            validateFieldEmpty(e.target.value) ? setConnectionTypeError(true) : setConnectionTypeError(false)
                        }}
                        required={true}
                        error={connectionTypeError}
                    >
                        <MenuItem value="LON">LON Bus</MenuItem>
                        <MenuItem value="LORA">LoRa</MenuItem>
                        <MenuItem value="ModBus">Modbus</MenuItem>
                        <MenuItem value="Impulse">Impulse</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: connectionTypeError ? '#d32f2f' : '',
                        }}
                    >
                        Select the connection for the meter
                    </FormHelperText>
                </FormControl>

                {/* Dirección de conexión */}
                <TextField
                    label="Connection Address"
                    variant="outlined"
                    value={meter.connectionAddress}
                    onChange={(e) => {
                        setMeter({ ...meter, connectionAddress: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setConnectionAddressError(true);
                            setConnectionAddressErrorMessage('Connection address is required');
                         } else {
                            setConnectionAddressError(false);
                         }
                    }}
                    required={true}
                    error={connectionAddressError || undefined}
                    helperText={connectionAddressErrorMessage}
                />

                {/* Corriente máxima */}
                <TextField
                    type="number"
                    label="Max Current"
                    value={meter.maxCurrent}
                    onChange={(e) => {
                        setMeter({ ...meter, maxCurrent: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setMaxCurrentError(true);
                            setMaxCurrentErrorMessage('Max current is required');
                         } else {
                            setMaxCurrentError(false);
                         }
                    }}
                    required={true}
                    error={maxCurrentError || undefined}
                    helperText={maxCurrentErrorMessage}
                />

                {/* Voltaje de referencia */}
                <TextField
                    type="number"
                    label="Reference Voltage"
                    value={meter.referenceVoltage}
                    onChange={(e) => {
                        setMeter({ ...meter, referenceVoltage: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setReferenceVoltageError(true);
                            setReferenceVoltageErrorMessage('Reference voltage is required');
                        } else {
                            setReferenceVoltageError(false);
                        }
                    }}
                    required={true}
                    error={referenceVoltageError || undefined}
                    helperText={referenceVoltageErrorMessage}
                />

                {/* Año de aprobación MID */}
                <TextField
                    type="number"
                    label="MID Approval Year"
                    value={meter.midApprovalYear}
                    onChange={(e) => {
                        setMeter({ ...meter, midApprovalYear: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setMidApprovalYearError(true);
                            setMidApprovalYearErrorMessage('MID approval year is required');
                        } else {
                            setMidApprovalYearError(false);
                        }
                    }}
                    required={true}
                    error={midApprovalYearError || undefined}
                    helperText={midApprovalYearErrorMessage}
                />

                {/* Botón de enviar, ocupa las dos columnas */}
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
};

export default MeterForm;