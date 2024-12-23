import React from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';

export default function Login() {
  const handleLoginClick = () => {
    window.opener = null;
    window.close();
    window.open('http://localhost:4000/api/auth/discord', '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h3>Welcome to Invaders Web Application</h3>
      <ButtonWrapper onClick={handleLoginClick}>Login with Discord</ButtonWrapper>
    </div>
  );
}
