import { CharacterDto } from '@/clients/auth/AUTH_UserReadController_findUser';
import { DataTable } from '@/components/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { DetailHeader } from '@/components/details-header/DetailHeader';

async function getData(): Promise<CharacterDto[]> {
  return [
    {
      id: 'name1',
      name: 'Character 1',
      class: 'Warrior',
      mainSpec: 'Tank',
      gearScoreMainSpec: 6000,
      offSpec: 'DPS',
      gearScoreOffSpec: 5900,
      skill: 100,
      faction: 'Alliance',
    },
    {
      id: 'name2',
      name: 'Character 2',
      class: 'Mage',
      mainSpec: 'Fire',
      gearScoreMainSpec: 6200,
      offSpec: undefined,
      gearScoreOffSpec: undefined,
      skill: 90,
      faction: 'Horde',
    },
    {
      id: 'name3',
      name: 'Character 3',
      class: 'Priest',
      mainSpec: 'Healer',
      gearScoreMainSpec: 6100,
      offSpec: 'Shadow',
      gearScoreOffSpec: 6000,
      skill: 95,
      faction: 'Alliance',
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<CharacterDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
      setLoading(false);
    };
    console.log('Fetching data...');
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={'card'}>
      <DetailHeader title="Characters">

      </DetailHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
