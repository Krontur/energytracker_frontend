import { 
  Modal, 
  Box, 
  Typography, 
  Avatar, 
  Chip,
  Card,
  CardContent,
  CardHeader,
  IconButton
} from '@mui/material';
import { Person as PersonIcon, Close as CloseIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { grey } from '@mui/material/colors';

const UserModal = ({ open, onClose, user }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: grey[500], // Usa el import de Material-UI en lugar del tema
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="h2" sx={{ textAlign: 'center', mt: 2 }}>
        Detalles del usuario
      </Typography>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={user.image}
                alt={user.fullName}
                sx={{ width: 80, height: 80 }}
              >
                {!user.image && <PersonIcon sx={{ fontSize: 40 }} />}
              </Avatar>
            }
            title={
              <Typography variant="h5" component="div">
                {user.fullName}
              </Typography>
            }
            subheader={
              <Chip 
                label={user.isActive ? "Activo" : "Inactivo"} 
                color={user.isActive ? "success" : "error"} 
                size="small" 
              />
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Rol:</strong> {user.role}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

UserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default UserModal;

