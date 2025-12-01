import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useCampaigns } from "../../lib/hooks/useCampaings";
import { useExperts } from "../../lib/hooks/useExperts"; 
import { useAnalystic } from "../../lib/hooks/useAnalystic"; 
import type {
  CreateCampaing,
  CampaingList,
  SelectOption,
} from "../../lib/types";

import type { CreateCampaingSchema } from "../../lib/schemas/createCampaingSchema";
import CampaingsTable from "./CampaingsTable";
import CreateCampaingModal from "./CreateCampaingModal";
import ListPageLayoutCampaings from "./ListPageLayoutCampaings";
import EditCampaignModal from "./EditCampaingModal";

export default function CampaingsDataContainer() {
  const [selectedCampaignNameForEdit, setSelectedCampaignNameForEdit] =
    useState<string | undefined>(undefined);
  const {
    campaigns,
    isLoading: isLoadingCampaigns,
    createCampaign,
    updateCampaign,
    campaign: campaignToEditData,
    isLoadingCampaign: isLoadingCampaignDetails,
  } = useCampaigns(selectedCampaignNameForEdit);
  const [campaignListItemForEdit, setCampaignListItemForEdit] = useState<CampaingList | undefined>(undefined);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [expertsList, setExpertsList] = useState<SelectOption[]>([]);
  const [analystsList, setAnalystsList] = useState<SelectOption[]>([]);
  const { projects: allExperts, isLoading: isLoadingExperts } = useExperts(); 
  const { analystics: allAnalysts, isLoading: isLoadingAnalysts } = useAnalystic(); 

  useEffect(() => {
    if (allExperts) {
      setExpertsList(
        allExperts.map((expert) => ({
          id: expert.id,
          name: expert.name,
        }))
      );
    }
    if (allAnalysts) {
      setAnalystsList(
        allAnalysts.map((analyst) => ({
          id: analyst.id,
          name: analyst.name,
        }))
      );
    }
  }, [allExperts, allAnalysts]);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateCampaing = async (campaingData: CreateCampaing) => {
    await createCampaign.mutateAsync(campaingData);
    handleCloseCreateModal();
  };

  const handleOpenEditModal = (campaign: CampaingList) => {
    setSelectedCampaignNameForEdit(campaign.name);
    setCampaignListItemForEdit(campaign); 
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCampaignNameForEdit(undefined);
    setCampaignListItemForEdit(undefined); 
  };

  const handleUpdateCampaign = async (
    id: string,
    data: CreateCampaingSchema
  ) => {
    await updateCampaign.mutateAsync({ id, ...data });
    handleCloseEditModal();
  };

  if (isLoadingCampaigns || isLoadingExperts || isLoadingAnalysts) {
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

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Criar nova campanha"
      onClick={handleOpenCreateModal}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <>
      <ListPageLayoutCampaings title="Campanhas" actionButton={addButton}>
        {!campaigns || campaigns.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">Nenhuma campanha encontrada</Typography>
            <Typography variant="body1">
              Clique no botão '+' para adicionar uma nova campanha.
            </Typography>
          </Box>
        ) : (
          <CampaingsTable campaigns={campaigns} onEdit={handleOpenEditModal} />
        )}
      </ListPageLayoutCampaings>
      <CreateCampaingModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateCampaing}
        isSubmitting={createCampaign.isPending}
        expertsList={expertsList}
        analystsList={analystsList}
      />
      {openEditModal && ( 
        <EditCampaignModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateCampaign}
          isSubmitting={updateCampaign.isPending || isLoadingCampaignDetails}
          campaignToEdit={campaignToEditData || null} 
          campaignListItem={campaignListItemForEdit} 
          expertsList={expertsList}
          analystsList={analystsList}
        />
      )}
    </>
  );
}
