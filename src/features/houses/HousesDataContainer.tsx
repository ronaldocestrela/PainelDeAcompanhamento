import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useHouses } from "../../lib/hooks/useHouses";
import type { ListBookmakers, CreateBookmakers } from "../../lib/types";
import type { CreateHouseSchema } from "../../lib/schemas/createHouseSchema";
import CreateHouseModal from "./createHouseModal";
import ListPageLayoutHouses from "./ListPageLayoutHouses";
import EditHouseModal from "./EditHouseModal";
import HousesCard from "./HousesCard";

export default function HousesDataContainer() {
  const { houses, isLoadingHouses, createHouse, updateHouse, uploadLogo } =
    useHouses();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<ListBookmakers | null>(
    null
  );

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenEditModal = (house: ListBookmakers) => {
    setSelectedHouse(house);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedHouse(null);
  };

  const handleCreateHouse = async (houseData: CreateBookmakers) => {
    try {
      await createHouse.mutateAsync(houseData);
      handleCloseCreateModal();
    } catch (error) {
      console.error("Erro ao criar casa:", error);
    }
  };

  const handleUpdateHouse = async (
    id: string,
    houseData: CreateHouseSchema
  ) => {
    if (selectedHouse) {
      const payload = {
        id: id,
        name: houseData.name,
        logoUrl: houseData.logoUrl,
      };

      try {
        await updateHouse.mutateAsync(payload);

        handleCloseEditModal();
      } catch (error) {
        console.error("Erro ao atualizar casa:", error);
      }
    } else {
      console.error("Nenhuma casa selecionada para atualizar.");
    }
  };

  const handleUploadLogo = async (houseId: string, file: File) => {
    try {
      await uploadLogo.mutateAsync({ id: houseId, file });
    } catch (error) {
      console.error("Erro ao fazer upload do logo:", error);
    }
  };

  if (isLoadingHouses) {
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
      aria-label="Adicionar nova casa"
      onClick={handleOpenCreateModal}
      sx={{ marginLeft: "auto" }}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <>
      <ListPageLayoutHouses title="Casas de Apostas" actionButton={addButton}>
        {!houses || houses.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nenhuma casa cadastrada
            </Typography>
            <Typography variant="body1">
              Clique no botão + para adicionar uma nova casa de apostas
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            {houses.map((house) => (
              <Box key={house.id} sx={{ flex: "1 1 300px", minWidth: 300 }}>
                <HousesCard
                  house={house}
                  onEdit={() => handleOpenEditModal(house)}
                  onUploadLogo={(file: File) =>
                    handleUploadLogo(house.id, file)
                  }
                />
              </Box>
            ))}
          </Box>
        )}
      </ListPageLayoutHouses>

      <CreateHouseModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateHouse}
        isSubmitting={createHouse.isPending}
      />
      {selectedHouse && (
        <EditHouseModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateHouse}
          isSubmitting={updateHouse.isPending}
          houseToEdit={selectedHouse}
        />
      )}
    </>
  );
}
