import React from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowsProp,
  GridSortModel,
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
  handleFilterModelChange?: (filterModel: GridFilterModel) => void;
  handleAddButtonClick?: () => void;
  columnVisibilityModel?: GridColumnVisibilityModel;
  checkboxSelection?: boolean;
  handleSortModeChange?: (sortModel: GridSortModel) => void;
}

export const DataGridWrapper = ({
  rows = [],
  columns,
  isLoading = false,
  rowCount = 0,
  page = 1,
  pageSize = 25,
  checkboxSelection = false,
  handlePaginationChange,
  handleAddButtonClick,
  handleFilterModelChange,
  handleSortModeChange,
  columnVisibilityModel = { id: false },
}: DataGridWrapperProps) => {
  function handlePaginationModelChange(model: GridPaginationModel, details: GridCallbackDetails<'pagination'>): void {
    if (details.reason !== 'setPaginationModel') return;
    handlePaginationChange(model.page, model.pageSize);
  }

  // Define the custom toolbar inside the component
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <ButtonWrapper
        variant="outlined"
        color="primary"
        onClick={handleAddButtonClick}>
        Add
      </ButtonWrapper>
    </GridToolbarContainer>
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={isLoading}
      columnVisibilityModel={columnVisibilityModel}
      rowCount={rowCount}
      paginationModel={{ page, pageSize }}
      paginationMode="server"
      pagination
      filterMode="server"
      onSortModelChange={handleSortModeChange}
      checkboxSelection={checkboxSelection}
      onFilterModelChange={handleFilterModelChange}
      onPaginationModelChange={handlePaginationModelChange}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
};
