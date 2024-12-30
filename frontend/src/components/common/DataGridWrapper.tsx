import React from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import ButtonWrapper from './ButtonWrapper';

interface DataGridWrapperProps {
  rows?: GridRowsProp;
  columns: GridColDef[];
  isLoading?: boolean;
  rowCount?: number;
  pageSize?: number;
  page?: number;
  handlePaginationChange: (page: number, pageSize: number) => void;
}

export const DataGridWrapper = ({
  rows = [],
  columns,
  isLoading = false,
  rowCount = 0,
  page = 1,
  pageSize = 25,
  handlePaginationChange,
}: DataGridWrapperProps) => {
  function handlePaginationModelChange(model: GridPaginationModel, details: GridCallbackDetails<'pagination'>): void {
    if (details.reason !== 'setPaginationModel') return;
    handlePaginationChange(model.page, model.pageSize);
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={isLoading}
      rowCount={rowCount}
      paginationModel={{ page, pageSize }}
      paginationMode="server"
      pagination
      filterMode="server"
      checkboxSelection
      onPaginationModelChange={handlePaginationModelChange}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <ButtonWrapper
        variant="outlined"
        color="primary"
        onClick={() => {
          alert('add');
        }}>
        Add
      </ButtonWrapper>
      <ButtonWrapper
        variant="outlined"
        color="secondary"
        onClick={() => {
          alert('delete');
        }}>
        Delete
      </ButtonWrapper>
    </GridToolbarContainer>
  );
}
