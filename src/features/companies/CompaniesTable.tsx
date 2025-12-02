import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Avatar, Typography } from "@mui/material";
import type { Company } from "../../lib/types";

interface CompaniesTableProps {
  companies: Company[] | undefined;
}

const getColumns = (): GridColDef<Company>[] => [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "host",
    headerName: "Host",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "tituloPagina",
    headerName: "Título da Página",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "expertsCount",
    headerName: "Contagem de Experts",
    width: 150,
    type: "number",
  },
  {
    field: "linkLogoHeader",
    headerName: "Logo Header",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Company, string>) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 36, height: 36, marginTop: 1 }}
      />
    ),
  },
  {
    field: "linkLogoMenuLateral",
    headerName: "Logo Menu Lateral",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Company, string>) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 36, height: 36, marginTop: 1 }}
      />
    ),
  },
  {
    field: "linkFavicon",
    headerName: "Favicon",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Company, string>) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 36, height: 36, marginTop: 1 }}
      />
    ),
  },
  {
    field: "linkLogoLogin",
    headerName: "Logo Login",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Company, string>) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 36, height: 36, marginTop: 1 }}
      />
    ),
  },
];

export default function CompaniesTable({
  companies,
}: CompaniesTableProps) {
  if (!companies) {
    return null;
  }

  const columns = getColumns();

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={companies}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}