import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCreateDeal, useDeals } from "../../lib/hooks/useDeals";
import type { CreateDealData } from "../../lib/types";
import ListPageLayoutDeals from "./ListPageLayoutDeals";
import DealsList from "./DealsList";

export default function DealsPage() {
  const { data: deals = [], isLoading, error } = useDeals();
  const createDealMutation = useCreateDeal();

  // Dados fictícios para demonstração enquanto não há dados reais
  const mockDeals = deals.length === 0 && !isLoading ? [
    {
      id: '1',
      bookmakerName: 'Bet365',
      companyName: 'LSK Tech',
      revValueExpert: 25.5,
      revValueAgency: 15.0,
      nplValueExpert: 30.0,
      nplValueAgency: 20.0,
      cpaValueExpert: 150.0,
      cpaValueAgency: 100.0,
      depositBonusExpert: 50.0,
      depositBonusAgency: 30.0,
      bookmakerId: '1080ed55-4d91-4caf-914f-72288c1c489b',
      expertId: 'ef612a18-a563-48df-a174-e7b62a890fc9',
    },
    {
      id: '2',
      bookmakerName: 'Betano',
      companyName: 'Digital Partners',
      revValueExpert: 28.0,
      revValueAgency: 18.0,
      nplValueExpert: 35.0,
      nplValueAgency: 25.0,
      cpaValueExpert: 180.0,
      cpaValueAgency: 120.0,
      depositBonusExpert: 60.0,
      depositBonusAgency: 40.0,
      bookmakerId: '2a8f7b3c-5e91-4d2b-8c6f-9e5a4b7d2c8e',
      expertId: '7f2e9a6b-8c4d-4e1a-9b7c-3f8e5a2d6b9c',
    },
    {
      id: '3',
      bookmakerName: 'Sportingbet',
      companyName: 'Gaming Solutions',
      revValueExpert: 22.0,
      revValueAgency: 12.0,
      nplValueExpert: 28.0,
      nplValueAgency: 18.0,
      cpaValueExpert: 140.0,
      cpaValueAgency: 90.0,
      depositBonusExpert: 45.0,
      depositBonusAgency: 25.0,
      bookmakerId: '4e9c2a7f-6b1d-4a8e-9c5b-2f7a8d3e6c9b',
      expertId: '9b6e4c2a-7f8d-4e1b-8c9a-5d2f7e6a9c4b',
    },
    {
      id: '4',
      bookmakerName: 'Betfair',
      companyName: 'Pro Gaming Ltd',
      revValueExpert: 32.0,
      revValueAgency: 22.0,
      nplValueExpert: 40.0,
      nplValueAgency: 30.0,
      cpaValueExpert: 200.0,
      cpaValueAgency: 150.0,
      depositBonusExpert: 75.0,
      depositBonusAgency: 50.0,
      bookmakerId: '8c5e2b9f-4a7d-4e2c-9b6a-1f8e5d3c7a9e',
      expertId: '6a9c4e2b-8f7d-4a1e-9c5b-3e8f2a6d9c4b',
    },
    {
      id: '5',
      bookmakerName: 'KTO',
      companyName: 'Expert Marketing',
      revValueExpert: 26.5,
      revValueAgency: 16.5,
      nplValueExpert: 32.0,
      nplValueAgency: 22.0,
      cpaValueExpert: 160.0,
      cpaValueAgency: 110.0,
      depositBonusExpert: 55.0,
      depositBonusAgency: 35.0,
      bookmakerId: '3f7a9c2e-6d4b-4a8e-9c2f-7a5e8d1c6b9a',
      expertId: '2c8f5a9e-7b4d-4e1a-9c6b-5f2a7e8d3c9b',
    },
  ] : deals;

  const handleCreateDeal = () => {
    // Valores fictícios para teste
    const dealData: CreateDealData = {
      bookmakerName: "Casa XDD",
      revValueExpert: 50.0,
      revValueAgency: 50.0,
      nplValueExpert: 50.0,
      nplValueAgency: 50.0,
      cpaValueExpert: 50.0,
      cpaValueAgency: 50.0,
      depositBonusExpert: 50.0,
      depositBonusAgency: 50.0,
      bookmakerId: "1080ed55-4d91-4caf-914f-72288c1c489b",
      expertId: "ef612a18-a563-48df-a174-e7b62a890fc9",
      initialDate: "2025-08-01",
    };

    createDealMutation.mutate(dealData, {
      onSuccess: () => {
        console.log("Deal criado com sucesso!");
      },
      onError: (error) => {
        console.error("Erro ao criar deal:", error);
      },
    });
  };

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Alert severity="error">
          Erro ao carregar acordos: {error.message}
        </Alert>
      </Box>
    );
  }

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

  return (
    <>
      <ListPageLayoutDeals
        title="Acordos"
        actionButton={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateDeal}
            disabled={createDealMutation.isPending}
          >
            Novo Acordo
          </Button>
        }
      >
        {/* Mensagens de feedback */}
        {createDealMutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Deal criado com sucesso!
          </Alert>
        )}

        {createDealMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Erro ao criar deal: {createDealMutation.error?.message}
          </Alert>
        )}

        {mockDeals.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nenhum acordo cadastrado
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Clique em "Novo Acordo" para criar seu primeiro acordo.
            </Typography>
          </Box>
        ) : (
          <DealsList deals={mockDeals} isLoading={isLoading} />
        )}
      </ListPageLayoutDeals>
    </>
  );
}