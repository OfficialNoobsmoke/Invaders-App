import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserContext } from '@/layout/context/UserContext';

export const PlayerInfo: React.FC = () => {
  const { username, factions, highestRole, discordId, displayName, characters } = useContext(UserContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player info</CardTitle>
      </CardHeader>
      <CardContent className={'grid grid-cols-2 grid-rows-3 gap-6'}>
        <div className="p-4">
          <h4 className="font-bold">Username</h4>
          <p className="border-b pb-1 pt-4">{username}</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold">Display name</h4>
          <p className="border-b pb-1 pt-4">{displayName}</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold">Discord ID</h4>
          <p className="border-b pb-1 pt-4">{discordId}</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold">Factions</h4>
          <p className="border-b pb-1 pt-4">{factions?.length > 1 ? factions.join(' & ') : factions}</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold">Highest role</h4>
          <p className="border-b pb-1 pt-4">{highestRole}</p>
        </div>
        <div className="p-4">
          <h4 className="font-bold">Number of characters</h4>
          <p className="border-b pb-1 pt-4">{characters?.length ?? 0}</p>
        </div>
      </CardContent>
    </Card>
  );
};
