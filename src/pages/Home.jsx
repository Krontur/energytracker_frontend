import { Toolbar, Typography, Box } from '@mui/material';
import background from '../assets/backgroundET.png';



function Home() {

  return (
      <Box
        component="main"
        sx={{ flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '100vh',
              width: '90%',
              margin: 'auto',

          }}
      >
        <Box component="img" src={background} alt="Energy Tracker Background" sx={{ height: 'auto', width: '100%', objectFit: 'contain', maxWidth: '1280px'}} />
        <Toolbar />
        <Typography>
          Welcome to the homepage. Select an option from the menu on the left to get started.
        </Typography>
      </Box>
  );
}

export default Home;
