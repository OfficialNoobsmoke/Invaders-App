import { DataGridWrapper } from '@/components/common/DataGridWrapper';
import {
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridRowId,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { getCharactersByUserId } from '../services/characterService';
import { Pagination } from '../interfaces/pagination';
import { UserContext } from '../context/userContexts';
import { MdEditSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ReadCharacter } from '../dto/characterDto';
import { MdPersonAdd } from 'react-icons/md';
import ButtonWrapper from '../components/common/ButtonWrapper';

export default function Characters() {
  const columns: GridColDef[] = [
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
      headerName: 'Gear score',
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
          onClick={redirectToEditCharacter(params.id)}
        />,
      ],
    },
  ];

  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [data, setData] = useState<Pagination<ReadCharacter[]>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [queryOptions, setQueryOptions] = useState<{
    filterModel?: GridFilterModel;
    sortModel?: GridSortModel;
  }>({
    filterModel: { items: [] },
    sortModel: [],
  });

  const redirectToEditCharacter = React.useCallback(
    (id: GridRowId) => () => {
      navigate('/character-details', {
        state: {
          message: 'Hello from Home!',
          characterId: id,
          mode: 'edit',
        },
      });
    },
    []
  );

  const redirectToAddCharacter = () => {
    navigate('/character-details', {
      state: {
        message: 'Hello from Home!',
        mode: 'add',
      },
    });
  };

  const setPaginationData = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

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

  const handleRowSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    rowSelectionModel.map((row) => console.log(row));
  };

  const { data: characters, isFetching } = useQuery({
    queryKey: ['characters', page, pageSize, queryOptions],
    queryFn: () => {
      return getCharactersByUserId(userContext?.id || '', page, pageSize, queryOptions);
    },
    retry: false,
    enabled: !!userContext?.id,
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
        handleFilterModelChange={handlePaginationModelChange}
        handleSortModeChange={handleSortModeChange}
        handleRowSelectionChange={handleRowSelectionChange}
        rowCount={data?.count}
        page={page}
        pageSize={pageSize}
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
}
