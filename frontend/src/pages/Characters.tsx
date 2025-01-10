import { DataGridWrapper } from '@/components/common/DataGridWrapper';
import { GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { createCharacter, getCharactersByUserId } from '../services/characterService';
import { AxiosError } from 'axios';
import { Character } from '../interfaces/character';
import { Pagination } from '../interfaces/pagination';
import { UserContext } from '../context/userContexts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'realmServerName', headerName: 'Realm-Server' },
  { field: 'name', headerName: 'Character Name' },
  { field: 'faction', headerName: 'Faction', type: 'singleSelect', valueOptions: ['Alliance', 'Horde'] },
  { field: 'class', headerName: 'Class' },
  {
    field: 'specializationName',
    headerName: 'Specialization',
    renderCell: (params) => params.row.specializations.map((s: { name: any }) => s.name).join(', '),
  },
  {
    field: 'specializationGearScore',
    headerName: 'Gearscore',
    type: 'number',
    renderCell: (params) => params.row.gearScore.map((s: { value: any }) => s.value).join(', '),
  },
  { field: 'charactersPreferredInstances', headerName: 'Preference In' },
  { field: 'charactersSavedInstances', headerName: 'Saved Instances' },
  { field: 'createdAt', headerName: 'Created At', type: 'date', valueGetter: (value) => value && new Date(value) },
  { field: 'actions', headerName: 'Actions' },
];

export default function Characters() {
  const userContext = useContext(UserContext);
  const [data, setData] = useState<Pagination<Character[]>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [queryOptions, setQueryOptions] = useState<{
    filterModel?: GridFilterModel;
    sortModel?: GridSortModel;
  }>({
    filterModel: { items: [] },
    sortModel: [],
  });

  function setPaginationData(page: number, pageSize: number) {
    setPage(page);
    setPageSize(pageSize);
  }

  const handlePaginationModelChange = (filterModel: GridFilterModel) => {
    setQueryOptions((prev) => ({
      ...prev,
      filterModel: filterModel,
    }));
  };

  const handleSortModeChange = (sortModel: GridSortModel) => {
    setQueryOptions((prev) => ({
      ...prev,
      sortModel: sortModel,
    }));
  };

  const { data: characters, isFetching } = useQuery({
    queryKey: ['characters', page, pageSize, queryOptions],
    queryFn: () => {
      return getCharactersByUserId(userContext?.id || '', page, pageSize, queryOptions);
    },
    retry: false,
    enabled: !!userContext?.id,
  });

  const dummyCharacter = {
    name: 'Test',
    faction: 'Alliance',
    characterClass: 'Warrior',
    realmServerId: 'a1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
    specializations: [{ name: 'Fury' }, { name: 'Protection' }],
    charactersPreferredInstances: ['673959db-e736-457c-bc7b-753f9972d977', '9e2e8d17-51c8-4ab6-8613-5d60e1dbb977'],
    charactersSavedInstances: ['9e2e8d17-51c8-4ab6-8613-5d60e1dbb977', '6328a2a7-85cb-4658-a8dc-de517cc63efa'],
  } as Character;

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
  }, [characters, page, pageSize, userContext?.id]);

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        rows={data?.data}
        isLoading={isFetching}
        handlePaginationChange={setPaginationData}
        handleAddButtonClick={() => createCharacterMutation.mutate()}
        handleFilterModelChange={handlePaginationModelChange}
        handleSortModeChange={handleSortModeChange}
        rowCount={data?.count}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
}
