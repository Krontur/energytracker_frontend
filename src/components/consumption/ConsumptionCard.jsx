import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ConsumptionCard = ({ meteringPoint, consumption }) => {

  const startDateInterval = new Date(consumption.consumptionTimestamp);
  const endDateInterval = new Date(startDateInterval.getTime() + (15 * 60 * 1000));

  return (
    <Card sx={{ 
      maxWidth: 480,
      minWidth: 320,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>
      <CardActionArea>
        <Box
          sx={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          {/* Example of an SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
            <rect x="50" y="50" width="100" height="120" rx="10" fill="#1976d2" />
            
            <rect x="60" y="70" width="80" height="30" rx="5" fill="#fff" />
            <text x="100" y="90" fontSize="14" textAnchor="middle" fill="#000">{consumption.consumptionValue} {meteringPoint.channel.energyUnit}</text>
            
            <polygon points="90,110 110,110 100,130 120,130 90,160 100,140 80,140" fill="#ffc107" />
          </svg>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {meteringPoint.locationName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Location: {meteringPoint.connectionDescription}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Maximum Consumption: {consumption.consumptionValue} {meteringPoint.channel.energyUnit}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Interval: from {startDateInterval.toUTCString()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            to {endDateInterval.toUTCString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ConsumptionCard.propTypes = {
  meteringPoint: PropTypes.object.isRequired,
  consumption: PropTypes.object.isRequired
};

export default ConsumptionCard;