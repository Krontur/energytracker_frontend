import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Box, FormControl, InputLabel, Select } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

dayjs.extend(utc);
dayjs.extend(timezone);
const localZone = dayjs.tz.guess();

const ConsumptionForm = ({ setConsumptions, setIntervalType }) => {
  const [formData, setFormData] = useState({
    meteringPointId: '',
    intervalType: 'INTERVAL',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  });

  const { api } = useFetchWithAuth();

  const [views, setViews] = useState(['day', 'month', 'year']);
  const [meteringPoints, setMeteringPoints] = useState([]);
  const [error, setError] = useState(null);
  const [errorDateTime, setErrorDateTime] = useState(false);
  const [errorDateTimeMessage, setErrorDateTimeMessage] = useState('');

  const MAX_SELECTABLE_DAY = dayjs().subtract(1, 'day');
  const MIN_SELECTABLE_DAY = dayjs().subtract(3, 'year');

  const handleFetchMeteringPoints = async () => {
    console.log('Fetching metering points');
    try {
      const response = await api.get('http://localhost:8082/api/v1/metering-points');

      if (response.ok) {
        const data = await response.json();
        setMeteringPoints(data);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const startDateTime = dayjs(formData.startDate)
      .hour(formData.intervalType === "INTERVAL" ? formData.startTime.hour() : 0)
      .minute(formData.intervalType === "INTERVAL" ? formData.startTime.minute() : 0)
      .second(0)
      .tz(localZone)
      .format('YYYY-MM-DDTHH:mm:ss');

    let endOf;

    switch (formData.intervalType) {
      case 'DAILY':
        endOf = 'day';
        break;
      case 'MONTHLY':
        endOf = 'month';
        break;
      case 'YEARLY':
        endOf = 'year';
        break;
      default:
        endOf = 'day';
    }

    const endDateTime = dayjs(formData.endDate.endOf(endOf))
      .hour(formData.intervalType === "INTERVAL" ? formData.endTime.hour() : 23)
      .minute(formData.intervalType === "INTERVAL" ? formData.endTime.minute() : 59)
      .second(formData.intervalType === "INTERVAL" ? 0 : 59)
      .tz(localZone)
      .format('YYYY-MM-DDTHH:mm:ss');

    const payload = {
      meteringPointId: formData.meteringPointId,
      intervalType: formData.intervalType,
      startDateTime,
      endDateTime,
    };
    console.log(JSON.stringify(payload));

    try {
      const res = await api.post('http://localhost:8082/api/v1/consumptions/metering-point/interval');

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      if (res.status === 204 || res.status === 404) {
        setConsumptions([]);
        setIntervalType(formData.intervalType);
        setError('No data found for the selected interval');
        return;
      }

      const data = await res.json();
      setConsumptions(data);
      setIntervalType(formData.intervalType);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error while performing the query.');
    }
  };

  

  const validateDateTime = () => {
    const startDate = dayjs(formData.startDate);
    const endDate = dayjs(formData.endDate);
    const startTime = dayjs(formData.startTime);
    const endTime = dayjs(formData.endTime);
  
    if (startDate.isSame(endDate, 'day')) {
      if (startTime.isAfter(endTime)) {
        setErrorDateTime(true);
        setErrorDateTimeMessage('Start time must be before end time');
        return false;
      }
    }
    setErrorDateTime(false);
    setErrorDateTimeMessage('');
    return true;
  };


  function getViews(intervalType) {
    switch (intervalType) {
      case 'YEARLY':
        return ['year'];
      case 'MONTHLY':
        return ['month', 'year'];
      default:
        return ['day', 'month', 'year'];
    }
  }

  useEffect(() => {
    handleFetchMeteringPoints();
  }, []);

  useEffect(() => {
    setViews(getViews(formData.intervalType));
    validateDateTime();
  }, [formData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={4}>
        <Typography variant="h5" gutterBottom>
          Consumption Query
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
            gap={3}
          >
            <FormControl fullWidth>
              <InputLabel id="metering-point-select-label">Metering Point ID</InputLabel>
              <Select
                labelId="metering-point-select-label"
                value={formData.meteringPointId}
                onChange={(e) => handleInputChange('meteringPointId', e.target.value)}
                required
              >
                {meteringPoints.map((meteringPoint) => (
                  <MenuItem key={meteringPoint.meteringPointId} value={meteringPoint.meteringPointId}>
                    {meteringPoint.meteringPointId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Interval Type"
              name="intervalType"
              select
              fullWidth
              value={formData.intervalType}
              onChange={(e) => handleInputChange('intervalType', e.target.value)}
              required
            >
              <MenuItem value="INTERVAL">Custom Interval</MenuItem>
              <MenuItem value="DAILY">By Day</MenuItem>
              <MenuItem value="MONTHLY">By Month</MenuItem>
              <MenuItem value="YEARLY">By Year</MenuItem>
            </TextField>
            <DatePicker
              label="Start Date"
              views={views}
              value={formData.startDate}
              defaultValue={dayjs().subtract(1, 'day')}
              onChange={(newValue) => handleInputChange('startDate', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required />}
              minDate={MIN_SELECTABLE_DAY}
              maxDate={formData.endDate || MAX_SELECTABLE_DAY} 
            />
            {formData.intervalType === 'INTERVAL' && (
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onError={errorDateTime}
                slotProps={{
                  textField: {
                    helperText: errorDateTimeMessage,
                  },
                }}
                onChange={(newValue) => {
                  validateDateTime();
                  handleInputChange('startTime', newValue);}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                    />
                  )}
                ampm={false}
              />
            )}
            <DatePicker
              label="End Date"
              views={views}
              value={formData.endDate}
              defaultValue={dayjs().subtract(1, 'day')}
              onChange={(newValue) => handleInputChange('endDate', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required />}
              disableFuture
              minDate={formData.startDate}
            />
            {formData.intervalType === 'INTERVAL' && (
              <TimePicker
                label="End Time"
                value={formData.endTime}
                onError={errorDateTime}
                slotProps={{
                  textField: {
                    helperText: errorDateTime ? errorDateTimeMessage : '',
                  },
                }}
                onChange={(newValue) => {
                  validateDateTime();               
                  handleInputChange('endTime', newValue);}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                  />
                )}
                ampm={false}
              />
            )}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={errorDateTime}
              >
              Submit
            </Button>
          </Box>
        </form>

        {error && (
          <Box mt={4}>
            <Typography variant="h6" color="error">
              Error:
            </Typography>
            <Typography>{error}</Typography>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

ConsumptionForm.propTypes = {
  setConsumptions: PropTypes.func,
  setIntervalType: PropTypes.func,
};

export default ConsumptionForm;
