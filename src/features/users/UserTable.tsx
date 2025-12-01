import { Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useUser } from "../../lib/hooks/useUser";

interface UserTableProps {
  onEdit: (user: any) => void;
}

const getColumns = (_onEdit: (user: any) => void): GridColDef[] => [
  { field: "name", headerName: "Nome", width: 200, flex: 1 },
  { field: "lastName", headerName: "Sobrenome", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 250, flex: 1 },
  { field: "role", headerName: "Papel", width: 150, flex: 1 },
];

export default function UserTable({ onEdit }: UserTableProps) {
  const { users, isLoadingUsers } = useUser();
  const columns = getColumns(onEdit);

  if (isLoadingUsers) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <p>Loading users...</p>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={users || []}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}
