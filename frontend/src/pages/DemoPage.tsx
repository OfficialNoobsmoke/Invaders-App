import ButtonWrapper from '@/components/common/ButtonWrapper';
import DataGridWrapper from '@/components/common/DataGridWrapper';
import { Pokemon } from '@/domain/pokemon';
import { FetchPokemons } from '@/services/demoService';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'url', headerName: 'Url' },
];

export default function DemoPage() {
  const [data, setData] = useState<Pokemon>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  function setPaginationData(page: number, pageSize: number) {
    setPage(page);
    setPageSize(pageSize);
  }

  function usePokemons(page: number, pageSize: number) {
    return useQuery({
      queryKey: ['pokemons', page, pageSize],
      queryFn: () => {
        return FetchPokemons({ page, limit: pageSize });
      },
    });
  }

  const { data: pokemon, isFetching } = usePokemons(page, pageSize);

  useEffect(() => {
    if (pokemon) {
      setData({
        ...pokemon,
        results: pokemon.results.map((row, index) => ({
          ...row,
          id: page * pageSize + index + 1,
        })),
      });
    }
  }, [pokemon, page, pageSize]);

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        rows={data?.results}
        isLoading={isFetching}
        handlePaginationChange={setPaginationData}
        rowCount={data?.count}
        page={page}
        pageSize={pageSize}
      />
      <ButtonWrapper
        variant="contained"
        color="primary"
        onClick={() => {
          alert('save');
        }}>
        Save
      </ButtonWrapper>
    </div>
  );
}
