import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ListPageLayoutDeals from "./ListPageLayoutDeals";
import DealsTable from "./DealsTable";
import CreateDealModal from "./CreateDealModal";
import { useDeals, useCreateDeal } from "../../lib/hooks/useDeals";
import { useHouses } from "../../lib/hooks/useHouses";
import { useExperts } from "../../lib/hooks/useExperts";
import type { Deal } from "../../lib/types";

export default function DealsDataContainer() {
  const { data: deals = [], isLoading, error } = useDeals();
  const createDealMutation = useCreateDeal();
  const { houses = [], isLoadingHouses } = useHouses();
  const { projects: experts = [], isLoading: isLoadingExperts } = useExperts();
  
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenEditModal = (deal: Deal) => {
    // TODO: Implementar modal de edição
    console.log('Edit deal:', deal);
  };

  const handleCreateDeal = async (dealData: any) => {
    await createDealMutation.mutateAsync(dealData);
    handleCloseCreateModal();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Erro ao carregar acordos
        </Typography>
        <Typography variant="body1">
          {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ListPageLayoutDeals
        title="Acordos"
        actionButton={
          <IconButton
            color="primary"
            aria-label="Adicionar novo acordo"
            onClick={handleOpenCreateModal}
          >
            <AddIcon />
          </IconButton>
        }
      >
        {!deals || deals.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nenhum acordo cadastrado
            </Typography>
            <Typography variant="body1">
              Ainda não há acordos para exibir.
            </Typography>
          </Box>
        ) : (
          <DealsTable deals={deals} onEdit={handleOpenEditModal} />
        )}
      </ListPageLayoutDeals>

      <CreateDealModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateDeal}
        isSubmitting={createDealMutation.isPending}
        houses={houses?.map(house => ({ id: house.id, name: house.name })) || []}
        isLoadingHouses={isLoadingHouses}
        experts={experts?.map(expert => ({ id: expert.id, name: expert.name })) || []}
        isLoadingExperts={isLoadingExperts}
      />
    </>
  );
}