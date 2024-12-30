import React, { useContext } from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { buildRouteUrl } from '../utils/urlBuildRouter';
import { apiRoutes } from '../constants/constants';
import { AuthenticationContext } from '../context/authenticationContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext || authenticationContext.isLoggedIn) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  const handleLoginClick = () => {
    window.location.href = buildRouteUrl(apiRoutes.LOGIN);
  };

  return (
    <div>
      <h3>Welcome to Invaders</h3>
      <ButtonWrapper onClick={handleLoginClick}>Login with Discord</ButtonWrapper>
    </div>
  );
}
