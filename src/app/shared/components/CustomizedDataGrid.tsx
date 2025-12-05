import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
  { field: 'expertName', headerName: 'Nome do Projeto', flex: 1, minWidth: 150 },
  { field: 'campaignName', headerName: 'Nome da Campanha', flex: 1.5, minWidth: 200 },
  { field: 'clicks', headerName: 'Cliques', flex: 0.5, minWidth: 80, type: 'number' },
  { field: 'registros', headerName: 'Registros', flex: 0.5, minWidth: 80, type: 'number' },
  { field: 'depositos', headerName: 'Depósitos', flex: 0.5, minWidth: 100, type: 'number' },
  { field: 'rev', headerName: 'Reavenue', flex: 0.5, minWidth: 100, type: 'number' },
  { field: 'ftd', headerName: 'FTD', flex: 0.5, minWidth: 80, type: 'number' },
  { field: 'cpa', headerName: 'CPA', flex: 0.5, minWidth: 100, type: 'number' },
  { field: 'reportDate', headerName: 'Data do Relatório', flex: 0.5, minWidth: 120 },
];

export default function CustomizedDataGrid({ rows }: { rows: GridRowsProp }) {
  console.log('📋 CustomizedDataGrid - Rows recebidas:', rows);
  console.log('📋 CustomizedDataGrid - Quantidade de rows:', rows?.length || 0);
  
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        checkboxSelection
        rows={rows || []}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}