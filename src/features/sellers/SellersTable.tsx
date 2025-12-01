import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { ListSeller } from "../../lib/types";

interface SellersTableProps {
  sellers: ListSeller[];
}

const columns: GridColDef<ListSeller>[] = [
  { field: "name", headerName: "Nome", flex: 1, minWidth: 150 },
  { field: "lastName", headerName: "Sobrenome", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
  { field: "role", headerName: "Função", flex: 1, minWidth: 120 },
  {
    field: "imageUrl",
    headerName: "Foto",
    width: 80,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
];

export default function SellersTable({ sellers }: SellersTableProps) {
  return (
    <DataGrid
      rows={sellers}
      columns={columns}
      getRowId={(row) => row.id}
      autoHeight
      pageSizeOptions={[10, 20, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableRowSelectionOnClick
    />
  );
}
