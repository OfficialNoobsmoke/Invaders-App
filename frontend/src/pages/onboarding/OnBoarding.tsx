import React from 'react';

export const OnBoarding: React.FC = () => {

  return (
    <div className="m-24 mx-auto max-w-md flex flex-col items-center font-sans">
      <h3 className="text-2xl font-bold mb-4">
        Welcome to Invaders Web Application
      </h3>
      <h2 className="text-xl font-bold mb-4">
        Please use Discord credentials to Log In
      </h2>
      <p className="text-lg mb-4">Click on the below button to get started!</p>
      <a
        href={`https://discord.com/oauth2/authorize?client_id=1248180796414754826&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email`}
        className="outline-none px-4 py-2 border-none text-lg mt-5 rounded-lg bg-blue-600 cursor-pointer no-underline text-white hover:bg-blue-700"
      >
        Login with Discord
      </a>
    </div>
  );
};