import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';
import { useAuth, LocalCacheUserKey } from '../../providers/authProvider';

export const PrivateRoutes = () => {
  const { user } = useAuth();
  const cachedUser = localStorage.getItem(LocalCacheUserKey);
  const currentUser = user? user : cachedUser;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
