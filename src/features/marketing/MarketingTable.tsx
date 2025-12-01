import { Box, Typography, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useMarketingActions } from "../../lib/hooks/useMarketing";
import { useDashboard } from "../../app/shared/components/DashboardContext";
import type { MarketingAction } from "../../lib/types";
import { useState } from "react";
import EditMarketingModal from "./EditMarketingModal";

export default function MarketingTable() {
  const { selectedExpertId } = useDashboard();
  const { marketingActions = [], isLoadingMarketingActions } =
    useMarketingActions(selectedExpertId);
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMarketingAction, setSelectedMarketingAction] = useState<MarketingAction | null>(null);

  const handleEditMarketingAction = (marketingAction: MarketingAction) => {
    setSelectedMarketingAction(marketingAction);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedMarketingAction(null);
  };

  const columns: GridColDef<MarketingAction>[] = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <Typography variant="body2" fontWeight="medium" sx={{ pt: 1.5 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 2,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "startDate",
      headerName: "Início",
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {new Date(params.value as string).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: "endDate",
      headerName: "Fim",
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {new Date(params.value as string).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: "isActive",
      headerName: "Ativo",
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <Chip
          label={params.value ? "Sim" : "Não"}
          color={params.value ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<MarketingAction>) => (
        <IconButton
          size="small"
          onClick={() => handleEditMarketingAction(params.row)}
          sx={{ color: "primary.main" }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (
    !isLoadingMarketingActions &&
    (!marketingActions || marketingActions.length === 0)
  ) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Ainda não há ações de marketing.</Typography>
        <Typography variant="body1">
          Clique no botão '+' para adicionar uma nova ação de marketing.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={marketingActions}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        autoHeight
        disableRowSelectionOnClick
        loading={isLoadingMarketingActions}
        localeText={{
          noRowsLabel: "Ainda não há ações de marketing.",
        }}
      />
      
      <EditMarketingModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        marketingAction={selectedMarketingAction}
      />
    </Box>
  );
}
