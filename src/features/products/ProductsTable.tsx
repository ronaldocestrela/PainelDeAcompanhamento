import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import type { ExpertList, Product } from "../../lib/types";
import { useExperts } from "../../lib/hooks/useExperts";

const getColumns = (
  onEdit: (product: Product) => void,
  expertsList: Partial<ExpertList>[]
): GridColDef<Product>[] => [
  {
    field: "expertId",
    headerName: "Expert",
    minWidth: 180,
    renderCell: (params: GridRenderCellParams<Product>) => {
      const expert = expertsList?.find((exp: Partial<ExpertList>) => exp.id === params.value);
      return (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {expert ? expert.name : "-"}
        </Typography>
      );
    },
  },
  {
    field: "name",
    headerName: "Nome do Produto",
    flex: 1,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<Product>) => (
      <Typography variant="body2" fontWeight="medium" sx={{ pt: 1.5 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "externalId",
    headerName: "ID Externo",
    minWidth: 120,
    renderCell: (params: GridRenderCellParams<Product>) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {params.row.externalId}
      </Typography>
    ),
  },
  {
    field: "hublaExternalId",
    headerName: "ID Hubla",
    minWidth: 120,
    renderCell: (params: GridRenderCellParams<Product>) => (
      <Typography variant="body2" sx={{ pt: 1.5 }}>
        {params.row.hublaExternalId}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<Product>) => (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          aria-label={`Editar ${params.row.name}`}
          color="primary"
          size="small"
          onClick={() => onEdit(params.row)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export default function ProductsTable({
  products,
  onEdit,
}: ProductsTableProps) {
  const { projects: expertsList = [] } = useExperts();
  const columns = getColumns(onEdit, expertsList);
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}
