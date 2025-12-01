import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useAnalystic } from "../../lib/hooks/useAnalystic";
import AnalystsTable from "./AnalystsTable";
import CreateAnalystsModal from "./CreateAnalystsModal";

import ListPageLayoutAnalysts from "./ListPageLayoutAnalysts";
import type { CreateAnalyst, DeatailAnalyst } from "../../lib/types";
import type { CreateAnalystSchema } from "../../lib/schemas/createAnalysticSchema";
import EditAnalystsModal from "./EditAnalystsModal";

interface AnalystsDataContainerProps {
  pageTitle: string;
}

export default function AnalystsDataContainer({
  pageTitle,
}: AnalystsDataContainerProps) {
  const { analyst: analysts, isLoadingAnalyst } = useAnalystic();
  // const [openCreateModal, setOpenCreateModal] = useState(false);
  // const handleOpenCreateModal = () => {
  //   setOpenCreateModal(true);
  // };

  // const handleCloseCreateModal = () => {
  //   setOpenCreateModal(false);
  // };

  // const handleCreateAnalyst = async (analystData: CreateAnalystSchema) => {
  //   const payload: CreateAnalyst = {
  //     ...analystData,
  //     photoUrl: analystData.photoUrl ?? "",
  //   };
  //   await createAnalyst.mutateAsync(payload);
  //   handleCloseCreateModal();
  // };

  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [selectedAnalyst, setSelectedAnalyst] = useState<DeatailAnalyst | null>(null);

  // const handleOpenEditModal = (analyst: DeatailAnalyst) => {
  //   setSelectedAnalyst(analyst);
  //   setOpenEditModal(true);
  // };

  // const handleCloseEditModal = () => {
  //   setOpenEditModal(false);
  //   setSelectedAnalyst(null);
  // };

  if (isLoadingAnalyst) {
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

  // const handleUpdateAnalyst = async (
  //   id: string,
  //   analystData: CreateAnalystSchema
  // ) => {
  //   if (updateAnalyst && selectedAnalyst) {
  //     const updatedAnalystPayload: DeatailAnalyst = {
  //       id: id,
  //       name: analystData.name,
  //       photoUrl: analystData.photoUrl ?? "",
  //       reports: selectedAnalyst.reports,
  //     };
  //     await updateAnalyst.mutateAsync(updatedAnalystPayload);
  //   } else {
  //     console.error(
  //       "Erro: a função updateAnalyst não está disponível no hook useAnalystic."
  //     );
  //   }
  //   handleCloseEditModal();
  // };

  // const addButton = (
  //   <IconButton
  //     color="primary"
  //     aria-label="Criar novo expert"
  //     onClick={handleOpenCreateModal}
  //   >
  //     <AddIcon />
  //   </IconButton>
  // );

  return (
    <>
      <ListPageLayoutAnalysts
        title={pageTitle}
        // actionButton={addButton}
      >
        {!analysts || analysts.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
              Não foi possivel Encontrar nenhum analista
            </Typography>
            {/* <Typography variant="body1">
              Clique no botão '+' para adicionar um novo analista.
            </Typography> */}
          </Box>
        ) : (
          <AnalystsTable
            analysts={analysts}
            // onEdit={handleOpenEditModal}
          />
        )}
      </ListPageLayoutAnalysts>
      {/* <CreateAnalystsModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateAnalyst}
        isSubmitting={createAnalyst.isPending}
      />
      {selectedAnalyst && (
        <EditAnalystsModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateAnalyst}
          isSubmitting={updateAnalyst?.isPending || false}
          analystToEdit={selectedAnalyst}
        />
      )} */}
    </>
  );
}
