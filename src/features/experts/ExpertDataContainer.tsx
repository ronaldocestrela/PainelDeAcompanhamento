import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useExperts } from "../../lib/hooks/useExperts";
import ListPageLayout from "./ListPageLayout";
import CreateExpertModal from "./CreateExpertModal";
import type { ExpertCreate, ExpertDetail, ExpertUpdate } from "../../lib/types";
import type { CreateExpertSchema } from "../../lib/schemas/createExpertSchema";
import EditExpertsModal from "./EditExpertModal";
import ExpertCard from "./ExpertCard";

interface ExpertDataContainerProps {
  pageTitle: string;
}

export default function ExpertDataContainer({
  pageTitle,
}: ExpertDataContainerProps) {
  const {
    projects: experts,
    isLoading,
    createExpert,
    updateProject: updateExpert,
  } = useExperts();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateExpert = async (expertData: ExpertCreate) => {
    await createExpert.mutateAsync(expertData);
    handleCloseCreateModal();
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<ExpertDetail | null>(
    null,
  );

  const handleOpenEditModal = (expert: ExpertDetail) => {
    setSelectedExpert(expert);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedExpert(null);
  };

  const handleUpdateExpert = async (
    id: string,
    expertData: CreateExpertSchema,
  ) => {
    if (updateExpert && selectedExpert) {
      const updatedExpertPayload: ExpertUpdate = {
        id: id,
        name: expertData.name,
        photoUrl: expertData.photoUrl ?? "",
      };
      await updateExpert.mutateAsync(updatedExpertPayload);
    }
    handleCloseEditModal();
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

  const addButton = (
    <Button
      variant="contained"
      size="small"
      startIcon={<AddIcon />}
      onClick={handleOpenCreateModal}
    >
      Novo Expert
    </Button>
  );

  return (
    <>
      <ListPageLayout title={pageTitle} actionButton={addButton}>
        {!experts || experts.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
              Não foi possível encontrar nenhum expert
            </Typography>
            <Typography variant="body1">
              Clique no botão 'Novo Expert' para adicionar.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {experts.map((expert) => (
              <Grid key={expert.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ExpertCard
                  expert={expert}
                  onEdit={() => handleOpenEditModal({ ...expert, reports: [] })}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </ListPageLayout>
      <CreateExpertModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateExpert}
        isSubmitting={createExpert.isPending}
      />
      {selectedExpert && (
        <EditExpertsModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateExpert}
          isSubmitting={updateExpert?.isPending || false}
          expertToEdit={selectedExpert}
        />
      )}
    </>
  );
}
