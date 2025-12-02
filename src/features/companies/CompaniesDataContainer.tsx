import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useCompanies } from "../../lib/hooks/useCompanies";
import CompaniesTable from "./CompaniesTable";
import CreateCompanyModal from "./CreateCompanyModal";
import ListPageLayoutCompanies from "./ListPageLayoutCompanies";
import type { CreateCompanySchema } from "../../lib/schemas/createCompanySchema";

interface CompaniesDataContainerProps {
  pageTitle: string;
}

export default function CompaniesDataContainer({
  pageTitle,
}: CompaniesDataContainerProps) {
  const { companies, isLoadingCompanies, createCompany } = useCompanies();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateCompany = async (companyData: CreateCompanySchema) => {
    await createCompany.mutateAsync(companyData);
    handleCloseCreateModal();
  };

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Criar nova empresa"
      onClick={handleOpenCreateModal}
    >
      <AddIcon />
    </IconButton>
  );

  if (isLoadingCompanies) {
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
      <ListPageLayoutCompanies
        title={pageTitle}
        actionButton={addButton}
      >
        {!companies || companies.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">
              Não foi possível encontrar nenhuma empresa
            </Typography>
            <Typography variant="body1">
              Clique no botão '+' para adicionar uma nova empresa.
            </Typography>
          </Box>
        ) : (
          <CompaniesTable
            companies={companies}
          />
        )}
      </ListPageLayoutCompanies>
      <CreateCompanyModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateCompany}
        isSubmitting={createCompany.isPending}
      />
    </>
  );
}