import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import { useUser } from "../../lib/hooks/useUser";
import ChangePasswordModal from "./ChangePasswordModal";

interface UserTableProps {
  onEdit: (user: any) => void;
}

const getColumns = (_onEdit: (user: any) => void, onChangePassword: (user: any) => void): GridColDef[] => [
  { field: "name", headerName: "Nome", width: 200, flex: 1 },
  { field: "lastName", headerName: "Sobrenome", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 250, flex: 1 },
  { field: "role", headerName: "Papel", width: 150, flex: 1 },
  {
    field: "actions",
    headerName: "Ações",
    width: 120,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton
        onClick={() => onChangePassword(params.row)}
        size="small"
        title="Alterar senha"
      >
        <KeyIcon />
      </IconButton>
    ),
  },
];

export default function UserTable({ onEdit }: UserTableProps) {
  const { users, isLoadingUsers } = useUser();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleChangePassword = (user: any) => {
    setSelectedUser(user);
    setPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
    setSelectedUser(null);
  };

  const columns = getColumns(onEdit, handleChangePassword);

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
      
      {selectedUser && (
        <ChangePasswordModal
          open={passwordModalOpen}
          onClose={handleClosePasswordModal}
          userId={selectedUser.id}
          userName={`${selectedUser.name} ${selectedUser.lastName}`}
        />
      )}
    </Box>
  );
}
