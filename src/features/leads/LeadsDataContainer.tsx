import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ListPageLayoutLeads from "./ListPageLayoutLeads";
import LeadsTable from "./LeadsTable";
import CreateLeadModal from "./CreateLeadModal";
import EditLeadModal from "./EditLeadModal";
import type { ListLeads } from "../../lib/types";
import type { CreateLeadSchema } from "../../lib/schemas/createLeadSchema";

import agente from "../../lib/api/agents";
import { useMutation } from "@tanstack/react-query";

const useLeads = () => {
  const createLead = useMutation({
    mutationFn: async (data: CreateLeadSchema) => {
      const response = await agente.post("/api/leadsReports/create", data);
      return response.data;
    },
  });

  const updateLead = useMutation({
    mutationFn: async (data: { id: string } & CreateLeadSchema) => {
      const response = await agente.put(
        `/api/leadsReports/update/${data.id}`,
        data
      );
      return response.data;
    },
  });

  // Aqui você pode adicionar o fetch dos leads reais se necessário
  return {
    leads: [] as ListLeads[],
    isLoadingLeads: false,
    createLead,
    updateLead,
  };
};

export default function LeadsDataContainer() {
  const { leads, isLoadingLeads, createLead, updateLead } = useLeads();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<ListLeads | null>(null);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenEditModal = (lead: ListLeads) => {
    setSelectedLead(lead);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedLead(null);
  };

  const handleCreateLead = async (data: CreateLeadSchema) => {
    await createLead.mutateAsync(data);
    handleCloseCreateModal();
  };
  if (isLoadingLeads) {
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

  return (
    <>
      <ListPageLayoutLeads
        title="Leads"
        actionButton={
          <IconButton
            color="primary"
            aria-label="Adicionar novo lead"
            onClick={handleOpenCreateModal}
          >
            <AddIcon />
          </IconButton>
        }
      >
        {!leads || leads.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nenhum lead cadastrado
            </Typography>
            <Typography variant="body1">
              Ainda não há leads para exibir.
            </Typography>
          </Box>
        ) : (
          <LeadsTable leads={leads} onEdit={handleOpenEditModal} />
        )}
      </ListPageLayoutLeads>

      <CreateLeadModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateLead}
        isSubmitting={createLead.isPending}
      />

      {selectedLead && (
        <EditLeadModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={(id, data) => updateLead.mutateAsync({ id, ...data })}
          isSubmitting={updateLead.isPending}
          leadToEdit={selectedLead}
        />
      )}
    </>
  );
}
