import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserContext } from '@/layout/context/UserContext';

export const PlayerCharacters: React.FC = () => {
  const { characters } = useContext(UserContext);
  return (
    <Card>
      <CardHeader>

        <CardTitle>Characters</CardTitle>
      </CardHeader>
      <CardContent className={`grid grid-cols-5 grid-rows-${characters?.length} gap-6`}>
        {characters?.map((character) => (
          <>
            <div className="p-4">
              <h4 className="font-bold">Char name</h4>
              <p className="border-b pb-1 pt-4">{character.name}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Class</h4>
              <p className="border-b pb-1 pt-4">{character.class}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Main spec</h4>
              <p className="border-b pb-1 pt-4">{character.mainSpec}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Gearscore main spec</h4>
              <p className="border-b pb-1 pt-4">{character.gearScoreMainSpec}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Off spec</h4>
              <p className="border-b pb-1 pt-4">{character.offSpec}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Gearscore off spec</h4>
              <p className="border-b pb-1 pt-4">{character.gearScoreOffSpec}</p>
            </div>
            <div className="p-4">
              <h4 className="font-bold">Faction</h4>
              <p className="border-b pb-1 pt-4">{character.faction}</p>
            </div>
          </>

        ))}

      </CardContent>
    </Card>
  );
};
