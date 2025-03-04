import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContexts';
import { DataGridWrapper } from '../components/common/DataGridWrapper';
import { GridRowId, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { MdEditSquare, MdPersonAdd } from 'react-icons/md';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRaidSessions } from '../services/raidSessionService';
import { ReadRaidSession } from '../dto/readRaidSession';

const useColumns = (redirectToEditCharacter: (id: GridRowId) => void): GridColDef[] => {
  return [
    { field: 'id', headerName: 'ID' },
    { field: 'realmServerName', headerName: 'Realm-Server', width: 150 },
    { field: 'allianceInstances', headerName: 'Alliance Instances', width: 150 },
    { field: 'hordeInstances', headerName: 'Horde Instances', width: 150 },
    { field: 'dateTime', headerName: 'Date & Time', type: 'date', valueGetter: (value) => value && new Date(value) },
    { field: 'duration', headerName: 'Duration', width: 150 },
    { field: 'locked', headerName: 'Locked', width: 150 },
    { field: 'active', headerName: 'Active', width: 150 },
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

const RaidSchedule = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [data, setData] = useState<ReadRaidSession[]>();

  const redirectToEditCharacter = useCallback(
    (id: GridRowId) => {
      navigate('/raid-session-details', {
        state: {
          raidSessionData: data?.find((c) => c.id === id),
          mode: 'edit',
        },
      });
    },
    [navigate, data]
  );

  const redirectToAddCharacter = () => {
    navigate('/raid-session-details', {
      state: { mode: 'add' },
    });
  };

  const { data: raidSessions, isFetching } = useQuery({
    queryKey: ['raid-sessions'],
    queryFn: () => getRaidSessions(),
    retry: false,
    enabled: !!userContext?.id,
  });

  useEffect(() => {
    if (raidSessions) {
      setData(raidSessions);
    }
  }, [raidSessions]);

  const columns = useColumns(redirectToEditCharacter);

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        rows={data || []}
        isLoading={isFetching}
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

export default RaidSchedule;
