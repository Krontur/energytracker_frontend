import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchWithAuth } from '../../hooks/useFetchWithAuth';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const MeterInfo = () => {

  const { id } = useParams();
  const { api } = useFetchWithAuth();

  const [meterInfo, setMeterInfo] = useState({});
  const [calibrations, setCalibrations] = useState([]);

  const handleFetchMeterInfo = async () => {
    try {
      const { data, status } = await api.get(`${VITE_API_BASE_URL}:8080/api/v1/meters/${id}`);
        if(status === 200) {
          setMeterInfo(data);
          setCalibrations(data.calibrationSchedules);
        } else {
          console.error('Error:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useEffect(() => {
    console.log('MeterInfo component mounted');
    handleFetchMeterInfo();
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back
        </Button>
        <Typography variant="h4" gutterBottom sx={{ pt: 8, textAlign: 'center' }}>
          Electric Energy Meter Information
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="h6" gutterBottom>Device Details</Typography>
            <Typography>ID: {meterInfo.energyMeterId}</Typography>
            <Typography>Created: {new Date(meterInfo.createdAt).toLocaleString()}</Typography>
            <Typography>Status: {meterInfo.deviceStatus}</Typography>
            <Typography>Type: {meterInfo.deviceType}</Typography>
            <Typography>Serial Number: {meterInfo.serialNumber}</Typography>
            <Typography>Updated: {new Date(meterInfo.updatedAt).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 300px' }}>
            <Typography variant="h6" gutterBottom>Technical Specifications</Typography>
            <Typography>Connection Address: {meterInfo.connectionAddress}</Typography>
            <Typography>Connection Type: {meterInfo.connectionType}</Typography>
            <Typography>Energy Meter Type: {meterInfo.energyMeterType}</Typography>
            <Typography>Max Current: {meterInfo.maxCurrent}</Typography>
            <Typography>MID Approval Year: {meterInfo.midApprovalYear}</Typography>
            <Typography>Reference Voltage: {meterInfo.referenceVoltage}</Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Calibration History
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Frequency (years)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Calibration</TableCell>
              <TableCell>Next Calibration</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calibrations.map((calibration) => (
              <TableRow key={calibration.calibrationId}>
                <TableCell>{calibration.calibrationId}</TableCell>
                <TableCell>{calibration.calibrationFrequencyInYears}</TableCell>
                <TableCell>{calibration.calibrationStatus}</TableCell>
                <TableCell>{new Date(calibration.lastCalibrationDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(calibration.nextCalibrationDate).toLocaleDateString()}</TableCell>
                <TableCell>{calibration.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MeterInfo;



