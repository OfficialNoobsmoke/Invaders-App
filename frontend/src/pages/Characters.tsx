import { DataGridWrapper } from '@/components/common/DataGridWrapper';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { createCharacter, getCharactersByUserId } from '../services/characterService';
import { AxiosError } from 'axios';
import { ICharacter } from '../interfaces/ICharacter';
import { IPagination } from '../interfaces/IPagination';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'realmServerId', headerName: 'Realm-Server' },
  { field: 'name', headerName: 'Character Name' },
  { field: 'faction', headerName: 'Faction', type: 'singleSelect', valueOptions: ['Alliance', 'Horde'] },
  { field: 'class', headerName: 'Class' },
  { field: 'spec1', headerName: 'Specialization 1' },
  { field: 'spec1gs', headerName: 'Specialization 1 gs' },
  { field: 'spec2', headerName: 'Specialization 2' },
  { field: 'spec2gs', headerName: 'Specialization 2 gs' },
  { field: 'charactersPreferredInstances', headerName: 'Preference In' },
  { field: 'charactersSavedInstances', headerName: 'Saved Instances' },
  { field: 'actions', headerName: 'Actions' },
];

export default function Characters() {
  const [data, setData] = useState<IPagination<ICharacter[]>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [queryOptions, setQueryOptions] = useState({});

  function setPaginationData(page: number, pageSize: number) {
    setPage(page);
    setPageSize(pageSize);
  }

  const handlePaginationModelChange = (filterModel: GridFilterModel) => {
    setQueryOptions({ filterModel: { ...filterModel.items } });
  };

  const { data: characters, isFetching } = useQuery({
    queryKey: ['characters', page, pageSize, queryOptions],
    queryFn: () => {
      return getCharactersByUserId(undefined, page, pageSize, queryOptions);
    },
    retry: false,
  });

  const dummyCharacter = {
    name: 'Test',
    faction: 'Alliance',
    characterClass: Math.random().toString(36).slice(2),
    realmServerId: 'a1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
    specializations: [
      { name: 'Fury', gearScore: 6900 },
      { name: 'Protection', gearScore: 6100 },
    ],
    charactersPreferredInstances: ['673959db-e736-457c-bc7b-753f9972d977'],
    charactersSavedInstances: ['9e2e8d17-51c8-4ab6-8613-5d60e1dbb977'],
  } as ICharacter;

  const createCharacterMutation = useMutation({
    mutationFn: () => createCharacter(dummyCharacter),
    onError: (error: AxiosError) => {
      console.error('Logout failed:', error.response?.data || error.message);
    },
  });

  useEffect(() => {
    if (characters) {
      setData(characters);
    }
  }, [characters, page, pageSize]);

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        rows={data?.data}
        isLoading={isFetching}
        handlePaginationChange={setPaginationData}
        handleAddButtonClick={() => createCharacterMutation.mutate()}
        handleFilterModelChange={handlePaginationModelChange}
        rowCount={data?.count}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}
