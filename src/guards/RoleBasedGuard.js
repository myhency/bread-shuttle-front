import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user, isAuthenticated } = useAuth();

  return { role: user?.role || '', isAuthenticated };
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { role, isAuthenticated } = useCurrentRole();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (!accessibleRoles.includes(role)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
