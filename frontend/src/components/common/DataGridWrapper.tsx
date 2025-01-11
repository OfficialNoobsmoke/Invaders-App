import React from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridSortModel,
  GridToolbarContainer,
} from '@mui/x-data-grid';

interface DataGridWrapperProps {
  rows?: GridRowsProp;
  columns: GridColDef[];
  isLoading?: boolean;
  rowCount?: number;
  limit?: number;
  page?: number;
  handlePaginationChange: (page: number, limit: number) => void;
  handleFilterModelChange?: (filterModel: GridFilterModel) => void;
  columnVisibilityModel?: GridColumnVisibilityModel;
  checkboxSelection?: boolean;
  handleSortModeChange?: (sortModel: GridSortModel) => void;
  handleRowSelectionChange?: (rowSelectionModel: GridRowSelectionModel) => void;
  toolbar?: React.ReactNode;
}

export const DataGridWrapper = ({
  rows = [],
  columns,
  isLoading = false,
  rowCount = 0,
  page = 1,
  limit = 25,
  checkboxSelection = false,
  handlePaginationChange,
  handleFilterModelChange,
  handleSortModeChange,
  handleRowSelectionChange,
  columnVisibilityModel = { id: false },
  toolbar,
}: DataGridWrapperProps) => {
  function handlePaginationModelChange(model: GridPaginationModel, details: GridCallbackDetails<'pagination'>): void {
    if (details.reason !== 'setPaginationModel') return;
    handlePaginationChange(model.page, model.pageSize);
  }

  // Define the custom toolbar inside the component
  const customToolbar = (Children: React.ReactNode) => <GridToolbarContainer>{Children}</GridToolbarContainer>;
  const customToolbarCaller = () => customToolbar(toolbar);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={isLoading}
      columnVisibilityModel={columnVisibilityModel}
      rowCount={rowCount}
      paginationModel={{ page, pageSize: limit }}
      paginationMode="server"
      pagination
      filterMode="server"
      onSortModelChange={handleSortModeChange}
      checkboxSelection={checkboxSelection}
      onRowSelectionModelChange={handleRowSelectionChange}
      onFilterModelChange={handleFilterModelChange}
      onPaginationModelChange={handlePaginationModelChange}
      slots={{
        toolbar: customToolbarCaller,
      }}
    />
  );
};
