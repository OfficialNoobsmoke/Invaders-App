import React, { useEffect } from "react";

export const OnBoarding: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

    if (user) {
      const userData = JSON.parse(decodeURIComponent(user));
      console.log("User Data:", userData);
    }
  }, []);

  return (
    <div className="m-24 mx-auto max-w-md flex flex-col items-center font-sans">
      <h3 className="text-2xl font-bold mb-4">
        Welcome to Discord OAuth log in
      </h3>
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
