import { useAuth } from '../context/AuthContext';

const useRoleCheck = () => {
  const { user } = useAuth();

  return {
    isAdmin: () => user?.role === 'ADMIN',
    isUser: () => user?.role === 'USER',
    isAuthenticated: () => !!user
  };
}

export default useRoleCheck;