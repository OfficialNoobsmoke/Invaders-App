import React from 'react';
import ButtonWrapper from '../components/common/ButtonWrapper';

export default function Login() {
  const handleLoginClick = () => {
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1253133059377598494&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email`;
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
