import { IconButton } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import type { ListLeads } from "../../lib/types";

const getColumns = (
  onEdit: (lead: ListLeads) => void
): GridColDef<ListLeads>[] => [
  {
    field: "date",
    headerName: "Data",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "registerCounts",
    headerName: "Registros",
    flex: 1,
    minWidth: 100,
    type: "number",
  },
  {
    field: "baseLeads",
    headerName: "Base Leads",
    flex: 1,
    minWidth: 100,
    type: "number",
  },
  {
    field: "expertId",
    headerName: "Expert ID",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "analystId",
    headerName: "Analyst ID",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    filterable: false,
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<ListLeads>) => (
      <IconButton
        aria-label={`Editar ${params.row.analystId}`}
        color="primary"
        size="small"
        onClick={() => onEdit(params.row)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    ),
  },
];

interface LeadsTableProps {
  leads: ListLeads[];
  onEdit: (lead: ListLeads) => void;
}

export default function LeadsTable({ leads, onEdit }: LeadsTableProps) {
  const columns = getColumns(onEdit);
  return (
    <DataGrid
      rows={leads}
      columns={columns}
      pageSizeOptions={[10, 20, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableRowSelectionOnClick
      autoHeight
    />
  );
}
