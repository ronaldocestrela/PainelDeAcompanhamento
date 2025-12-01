import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { ListSales } from "../../lib/types";

const columns: GridColDef<ListSales>[] = [
  {
    field: "productName",
    headerName: "Produto",
    flex: 1,
    minWidth: 180,
    renderCell: (params: GridRenderCellParams<ListSales>) => (
      <Typography variant="body2" fontWeight="medium" sx={{ pt: 1.5 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "price",
    headerName: "Valor",
    minWidth: 100,
    renderCell: (params: GridRenderCellParams<ListSales>) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "sellerName",
    headerName: "Vendedor",
    minWidth: 160,
    renderCell: (params: GridRenderCellParams<ListSales>) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "saleDate",
    headerName: "Data",
    minWidth: 120,
    renderCell: (params: GridRenderCellParams<ListSales>) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {new Date(params.value as string).toLocaleDateString()}
      </Typography>
    ),
  },
];

import SalesLoading from "./SalesLoading";

export default function SalesTable({
  allSales = [],
  totalValue = 0,
  isLoadingAllSales,
}: {
  allSales: ListSales[];
  totalValue: number;
  isLoadingAllSales: boolean;
}) {
  if (isLoadingAllSales) {
    return <SalesLoading />;
  }
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <DataGrid
        rows={allSales}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        autoHeight
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: "Ainda não há vendas.",
        }}
      />
      <Box sx={{ position: "absolute", left: 0, bottom: 0, p: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          Valor Total:{" "}
          <span style={{ fontWeight: 400 }}>
            {totalValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
