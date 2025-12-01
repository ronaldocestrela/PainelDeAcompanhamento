import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Analyst } from "../../lib/types";

interface AnalystsTableProps {
  analysts: Analyst[] | undefined;
  onEdit?: (analyst: Analyst) => void;
}

// id: string;
// role: string;
// name: string;
// lastName: string;
// email: string;
// imageUrl: string;

const getColumns = (
  onEdit?: (analyst: Analyst) => void
): GridColDef<Analyst>[] => [
  {
    field: "photoUrl",
    headerName: "Foto",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 36, height: 36, marginTop: 1 }}
      />
    ),
  },

  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "email",
    headerName: "E-mail",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "role",
    headerName: "Função",
    flex: 1,
    minWidth: 150,
  },
  // {
  //   field: "reports",
  //   headerName: "Relatórios",
  //   width: 120,
  //   valueGetter: (value: Analyst["reports"]) => value?.length || 0,
  //   renderCell: (params) => (
  //     <Typography variant="body2">{params.value}</Typography>
  //   ),
  // },
  // {
  //   field: "actions",
  //   headerName: "Ações",
  //   width: 100,
  //   sortable: false,
  //   filterable: false,
  //   renderCell: (params) => (
  //     <IconButton onClick={() => onEdit(params.row)} aria-label="Editar analista">
  //       <EditIcon />
  //     </IconButton>
  //   ),
  // }
];

export default function AnalystsTable({
  analysts,
  onEdit,
}: AnalystsTableProps) {
  if (!analysts) {
    return null;
  }

  const columns = getColumns(onEdit);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={analysts}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}
