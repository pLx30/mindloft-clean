// src/components/ProtectedRoute.jsx
import { useSession } from '../lib/sessionContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← Dieser Import fehlt dir aktuell!

const ProtectedRoute = ({ children }) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  if (!session) return null;

  return children;
};

export default ProtectedRoute;
