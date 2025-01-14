import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridActionsCellItem, GridFilterModel, GridSortModel, GridRowId } from '@mui/x-data-grid';
import { MdEditSquare, MdPersonAdd } from 'react-icons/md';

import { DataGridWrapper } from '@/components/common/DataGridWrapper';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { getCharactersByUserId } from '../services/characterService';
import { Pagination } from '../interfaces/pagination';
import { UserContext } from '../context/userContexts';
import { ReadCharacter } from '../dto/characterDto';

const useColumns = (redirectToEditCharacter: (id: GridRowId) => void): GridColDef[] => {
  return [
    { field: 'id', headerName: 'ID' },
    { field: 'realmServerName', headerName: 'Realm-Server', width: 150 },
    { field: 'name', headerName: 'Character Name', width: 150 },
    { field: 'faction', headerName: 'Faction', type: 'singleSelect', valueOptions: ['Alliance', 'Horde'], width: 100 },
    { field: 'class', headerName: 'Class', width: 100 },
    {
      field: 'specializationName',
      headerName: 'Specialization',
      renderCell: (params) => params.row.specializations.map((s: { name: string }) => s.name).join(', '),
      width: 200,
    },
    {
      field: 'specializationGearScore',
      headerName: 'Gear Score',
      type: 'number',
      renderCell: (params) => params.row.gearScore.map((s: { value: number }) => s.value).join(', '),
      width: 150,
    },
    { field: 'charactersPreferredInstances', headerName: 'Preference In', width: 200 },
    { field: 'charactersSavedInstances', headerName: 'Saved Instances', width: 200 },
    { field: 'createdAt', headerName: 'Created At', type: 'date', valueGetter: (value) => value && new Date(value) },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<MdEditSquare />}
          label="Edit"
          onClick={() => redirectToEditCharacter(params.id)}
        />,
      ],
    },
  ];
};

const Characters = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [data, setData] = useState<Pagination<ReadCharacter[]>>();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const [queryOptions, setQueryOptions] = useState<{ filterModel?: GridFilterModel; sortModel?: GridSortModel }>({
    filterModel: { items: [] },
    sortModel: [],
  });

  const redirectToEditCharacter = useCallback(
    (id: GridRowId) => {
      navigate('/character-details', {
        state: {
          characterData: data?.data.find((c) => c.id === id),
          mode: 'edit',
        },
      });
    },
    [navigate, data]
  );

  const redirectToAddCharacter = () => {
    navigate('/character-details', {
      state: { mode: 'add' },
    });
  };

  const { data: characters, isFetching } = useQuery({
    queryKey: ['characters', page, limit, queryOptions],
    queryFn: () => getCharactersByUserId(userContext?.id || '', page, limit, queryOptions),
    retry: false,
    enabled: !!userContext?.id,
  });

  useEffect(() => {
    if (characters) {
      setData(characters);
    }
  }, [characters]);

  const handlePaginationData = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  const handleFilterModelChange = (filterModel: GridFilterModel) => {
    setQueryOptions((prev) => ({ ...prev, filterModel }));
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setQueryOptions((prev) => ({ ...prev, sortModel }));
  };

  const columns = useColumns(redirectToEditCharacter);

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        rows={data?.data || []}
        isLoading={isFetching}
        handlePaginationChange={handlePaginationData}
        handleFilterModelChange={handleFilterModelChange}
        handleSortModeChange={handleSortModelChange}
        rowCount={data?.count || 0}
        page={page}
        limit={limit}
        toolbar={
          <ButtonWrapper
            startIcon={<MdPersonAdd />}
            variant="outlined"
            onClick={redirectToAddCharacter}>
            Add
          </ButtonWrapper>
        }
      />
    </div>
  );
};

export default Characters;
