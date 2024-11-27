import React from 'react';
import { CharacterDto } from '@/clients/auth/AUTH_UserReadController_findUser';
import { ColumnDef } from '@tanstack/react-table';

export const TableCharacters: React.FC = () => {

  const columns: ColumnDef<CharacterDto>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'class',
      header: 'Class',
    },
    {
      accessorKey: 'mainSpec',
      header: 'Main spec',
    },
    {
      accessorKey: 'gearScoreMainSpec',
      header: 'Gearscore main spec',
    },
    {
      accessorKey: 'offSpec',
      header: 'Off spec',
    },
    {
      accessorKey: 'gearScoreOffSpec',
      header: 'Gearscore off spec',
    },
    {
      accessorKey: 'skill',
      header: 'Skill',
    },
    {
      accessorKey: 'faction',
      header: 'Faction',
    },
  ];

  async function getData(): Promise<CharacterDto[]> {
    return [
      {
        id: 'name',
        name: 'Name',
        class: 'Name',
        mainSpec: 'Name',
        gearScoreMainSpec: 0,
        offSpec: 'Name',
        gearScoreOffSpec: 0,
        skill: 0,
        faction: 'Alliance',
      },
      {
        id: 'name',
        name: 'Name',
        class: 'Name',
        mainSpec: 'Name',
        gearScoreMainSpec: 0,
        offSpec: 'Name',
        gearScoreOffSpec: 0,
        skill: 0,
        faction: 'Alliance',
      },
      {
        id: 'name',
        name: 'Name',
        class: 'Name',
        mainSpec: 'Name',
        gearScoreMainSpec: 0,
        offSpec: 'Name',
        gearScoreOffSpec: 0,
        skill: 0,
        faction: 'Alliance',
      },
    ];
  }


  return (
    <div className="container mx-auto py-10">
    </div>
  );
};
