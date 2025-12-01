import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import {format} from 'date-fns'
import type { Deal } from "../../lib/types";

const getColumns = (onEdit: (deal: Deal) => void): GridColDef<Deal>[] => [
  {
    field: "initialDate",
    headerName: "Data",
    flex: 1,
    minWidth: 110,
    valueFormatter: (date) => {
      return format(new Date(date), 'dd/MM/yyyy')
    }
  },
  {
    field: "bookmakerName",
    headerName: "Casa",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "companyName",
    headerName: "Projeto",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "cpaValueExpert",
    headerName: "CPA Expert (R$)",
    width: 150,
  },
  {
    field: "cpaValueAgency",
    headerName: "CPA Agência (R$)",
    width: 150,
  },
  {
    field: "revValueExpert",
    headerName: "Rev Expert (%)",
    width: 130,
  },
  {
    field: "revValueAgency",
    headerName: "Rev Agência (%)",
    width: 130,
  },
  {
    field: "depositBonusExpert",
    headerName: "Bônus Depósito Expert (R$)",
    width: 210,
  },
  {
    field: "depositBonusAgency",
    headerName: "Bônus Depósito Agência (R$)",
    width: 210,
  },
];

interface DealsTableProps {
  deals: Deal[];
  onEdit: (deal: Deal) => void;
}

export default function DealsTable({ deals, onEdit }: DealsTableProps) {
  const columns = getColumns(onEdit);
  return (
    <DataGrid
      rows={deals}
      columns={columns}
      pageSizeOptions={[10, 20, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableRowSelectionOnClick
      autoHeight
    />
  );
}