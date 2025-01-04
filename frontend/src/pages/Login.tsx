import React, { useContext } from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { RouteBuilder } from '../utils/urlBuildRouter';
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
    const loginRoute = new RouteBuilder().addRoute(apiRoutes.LOGIN).build();
    window.location.href = loginRoute;
  };

  return (
    <div>
      <h3>Welcome to Invaders</h3>
      <ButtonWrapper onClick={handleLoginClick}>Login with Discord</ButtonWrapper>
    </div>
  );
}
