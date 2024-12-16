import PropTypes from "prop-types";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText,
    FormControlLabel, Switch, FormLabel } from "@mui/material";
import { useState, useEffect } from "react";


const ChannelForm = ({ onClose, loadChannel }) => {

    const [channel, setChannel] = useState({
        channelId: null,
        channelLongName: '',
        channelMode: null,
        channelName: '',
        channelNumber: null,
        energyUnit: '',
        iratio: null,
        lonIsActive: false,
        lonSubChannel: null,
        pfactor: null,
        powerUnit: '',
        stationId: null,
        uratio: null,
    });

    const [channelNameError, setChannelNameError] = useState(false);
    const [channelNameErrorMessage, setChannelNameErrorMessage] = useState('');
    const [channelNumberError, setChannelNumberError] = useState(false);
    const [channelNumberErrorMessage, setChannelNumberErrorMessage] = useState('');
    const [channelLongNameError, setChannelLongNameError] = useState(false);
    const [channelLongNameErrorMessage, setChannelLongNameErrorMessage] = useState('');
    const [channelModeError, setChannelModeError] = useState(false);
    const [energyUnitError, setEnergyUnitError] = useState(false);
    const [powerUnitError, setPowerUnitError] = useState(false);
    const [iratioError, setIratioError] = useState(false);
    const [iratioErrorMessage, setIratioErrorMessage] = useState('');
    const [uratioError, setUratioError] = useState(false);
    const [uratioErrorMessage, setUratioErrorMessage] = useState('');
    const [lonSubChannelError, setLonSubChannelError] = useState(false);
    const [lonSubChannelErrorMessage, setLonSubChannelErrorMessage] = useState('');

    const validateFieldEmpty = (field) => {
        return field === '' || field === null;
    }

    const validateForm = () => {
        let isValid = true;
        if (validateFieldEmpty(channel.channelName)) {
            setChannelNameError(true);
            setChannelNameErrorMessage('Channel name is required');
            isValid = false;
        }
        if (validateFieldEmpty(channel.channelNumber)) {
            setChannelNumberError(true);
            setChannelNumberErrorMessage('Channel number is required');
            isValid = false;
        }
        if (validateFieldEmpty(channel.channelLongName)) {
            setChannelLongNameError(true);
            setChannelLongNameErrorMessage('Channel long name is required');
            isValid = false;
        }
        if (validateFieldEmpty(channel.channelMode)) {
            setChannelModeError(true);
            isValid = false;
        }
        if (validateFieldEmpty(channel.energyUnit)) {
            setEnergyUnitError(true);
            isValid = false;
        }
        if (validateFieldEmpty(channel.powerUnit)) {
            setPowerUnitError(true);
            isValid = false;
        }
        if (validateFieldEmpty(channel.iratio)) {
            setIratioError(true);
            setIratioErrorMessage('Current ratio is required');
            isValid = false;
        }
        if (validateFieldEmpty(channel.uratio)) {
            setUratioError(true);
            setUratioErrorMessage('Voltage ratio is required');
            isValid = false;
        }
        if (validateFieldEmpty(channel.lonSubChannel)) {
            setLonSubChannelError(true);
            setLonSubChannelErrorMessage('Lon Subchannel is required');
            isValid = false;
        }
        return isValid;
    }



    useEffect(() => {
        if (loadChannel) {
            setChannel(loadChannel);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8080/api/v1/channels', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(channel),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    onClose();
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
            <h2>Edit Channel</h2>
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
                    label="Channel ID"
                    variant="outlined"
                    value={channel.channelId}
                    disabled
                    fullWidth
                />

                <TextField
                    type="number"
                    label="Channel Number"
                    value={channel.channelNumber}
                    onChange={(e) => {
                        setChannel({ ...channel, channelNumber: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setChannelNumberError(true);
                            setChannelNumberErrorMessage('Channel number is required');
                        } else {
                            setChannelNumberError(false);
                        }
                    }}
                    disabled
                    required={true}
                    error={channelNumberError || undefined}
                    helperText={channelNumberErrorMessage}
                />

                <TextField
                    label="Channel name"
                    variant="outlined"
                    value={channel.channelName}
                    inputValue={channel.channelName}
                    onChange={(e) => {
                        setChannel({ ...channel, channelName: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setChannelNameError(true);
                            setChannelNameErrorMessage('Channel name is required');
                        } else {
                            setChannelNameError(false);
                        }
                    }}
                    required={true}
                    error={channelNameError || undefined}
                    helperText={channelNameErrorMessage}
                />

                <TextField
                    label="Channel long name"
                    variant="outlined"
                    value={channel.channelLongName}
                    inputValue={channel.channelLongName}
                    onChange={(e) => {
                        setChannel({ ...channel, channelLongName: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setChannelLongNameError(true);
                            setChannelLongNameErrorMessage('Channel long name is required');
                        } else {
                            setChannelLongNameError(false);
                        }
                    }}
                    required={true}
                    error={channelLongNameError || undefined}
                    helperText={channelLongNameErrorMessage}
                />

                <FormControl variant="outlined">
                    <InputLabel id="channel-mode-label">Channel Mode</InputLabel>
                    <Select
                        sx={{textAlign: 'left'}}
                        labelId="channel-mode-label"
                        id="channel-mode"
                        value={channel.channelMode + ''}
                        onChange={(e) => {
                            setChannel({ ...channel, channelMode: e.target.value })
                            validateFieldEmpty(e.target.value) ? setChannelModeError(true) : setChannelModeError(false)
                        }}
                        required={true}
                        error={channelModeError}
                    >
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: channelModeError ? '#d32f2f' : '',
                        }}
                    >
                        Select the channel mode
                    </FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel id="energy-unit-label">Energy unit</InputLabel>
                    <Select
                        sx={{textAlign: 'left'}}
                        labelId="energy-unit-label"
                        id="energy-unit"
                        value={channel.energyUnit}
                        onChange={(e) => {
                            setChannel({ ...channel, energyUnit: e.target.value })
                            validateFieldEmpty(e.target.value) ? setEnergyUnitError(true) : setEnergyUnitError(false)
                        }}
                        required={true}
                        error={energyUnitError}
                    >
                        <MenuItem value="WH">Wh</MenuItem>
                        <MenuItem value="KWH">KWh</MenuItem>
                        <MenuItem value="MWH">MWh</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: energyUnitError ? '#d32f2f' : '',
                        }}
                    >
                        Select the energy unit
                    </FormHelperText>
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel id="power-unit-label">Power unit</InputLabel>
                    <Select
                        sx={{textAlign: 'left'}}
                        labelId="power-unit-label"
                        id="power-unit"
                        value={channel.powerUnit}
                        onChange={(e) => {
                            setChannel({ ...channel, powerUnit: e.target.value })
                            validateFieldEmpty(e.target.value) ? setPowerUnitError(true) : setPowerUnitError(false)
                        }}
                        required={true}
                        error={powerUnitError}
                    >
                        <MenuItem value="W">W</MenuItem>
                        <MenuItem value="KW">KW</MenuItem>
                        <MenuItem value="MW">MW</MenuItem>
                    </Select>
                    <FormHelperText
                        sx={{
                            color: powerUnitError ? '#d32f2f' : '',
                        }}
                    >
                        Select the power unit
                    </FormHelperText>
                </FormControl>

                <TextField
                    type="number"
                    label="Current ratio"
                    value={channel.iratio}
                    inputValue={channel.iratio}
                    onChange={(e) => {
                        setChannel({ ...channel, iratio: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setIratioError(true);
                            setIratioErrorMessage('Current ratio is required');
                        } else {
                            setIratioError(false);
                        }
                    }}
                    required={true}
                    error={iratioError || undefined}
                    helperText={iratioErrorMessage}
                />

                <TextField
                    type="number"
                    label="Voltage ratio"
                    value={channel.uratio}
                    inputValue={channel.uratio}
                    onChange={(e) => {
                        setChannel({ ...channel, uratio: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setUratioError(true);
                            setUratioErrorMessage('Voltage ratio is required');
                        } else {
                            setUratioError(false);
                        }
                    }}
                    required={true}
                    error={uratioError || undefined}
                    helperText={uratioErrorMessage}
                />

                <TextField
                    type="number"
                    label="Lon Subchannel"
                    value={channel.lonSubChannel}
                    inputValue={channel.lonSubChannel}
                    onChange={(e) => {
                        setChannel({ ...channel, lonSubChannel: e.target.value })
                        if(validateFieldEmpty(e.target.value)){
                            setLonSubChannelError(true);
                            setLonSubChannelErrorMessage('Lon Subchannel is required');
                        } else {
                            setLonSubChannelError(false);
                        }
                    }}
                    required={true}
                    error={lonSubChannelError || undefined}
                    helperText={lonSubChannelErrorMessage}
                />

                <FormControl variant="outlined">
                    <FormLabel component="legend">Lon channel active?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                type="checkbox"
                                checked={channel.lonIsActive}
                                onChange={(e) => setChannel({ ...channel, lonIsActive: e.target.checked })}
                                required={true}
                            />
                        }
                        label="Active"
                    />
                </FormControl>

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

};

PropTypes.ChannelForm = {
    onClose: PropTypes.func.isRequired,
    loadChannel: PropTypes.object.isRequired,
};

export default ChannelForm;