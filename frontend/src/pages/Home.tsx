import React, { useContext } from 'react';
import { UserContext } from '../context/userContexts';

const Home = () => {
  const user = useContext(UserContext);
  if (!user) return null;
  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
    </div>
  );
};

export default Home;
