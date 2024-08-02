import { CustomErrorBoundary } from '../components/CustomErrorBoundary';
import { OnBoarding } from '../pages/onboarding/OnBoarding';
import Layout from './Layout';
import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

export const RootLayout: React.FC = () => {

  const { isAuthenticated } = useContext(UserContext)


  console.log(isAuthenticated);


  return (
    <CustomErrorBoundary>
      {isAuthenticated ? <Layout /> : <OnBoarding />}
    </CustomErrorBoundary>
  );
};