import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';

const AuthRoute = ({ children }) => {
  const [status, setStatus] = useState({ loading: true, authenticated: false });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/is-auth`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          setStatus({ loading: false, authenticated: true });
        } else {
          setStatus({ loading: false, authenticated: false });
        }
      } catch (err) {
        setStatus({ loading: false, authenticated: false });
      }
    };

    checkAuth();
  }, []);

  if (status.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-purple-600 text-lg">
        Loading...
      </div>
    );
  }

  return status.authenticated ? <Navigate to="/home" replace /> : children;
};

export default AuthRoute;