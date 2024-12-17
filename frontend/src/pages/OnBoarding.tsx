import React from 'react';

export const OnBoarding: React.FC = () => {
  const handleLoginClick = () => {
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1253133059377598494&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email`;
    window.opener = null;
    window.close();
    window.open(discordAuthUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h3>
        Welcome to Invaders Web Application
      </h3>
      <h2>
        Please use Discord credentials to Log In
      </h2>
      <p>Click on the below button to get started!</p>
      <button
        onClick={handleLoginClick}>
        Login with Discord
      </button>
    </div>
  );
};