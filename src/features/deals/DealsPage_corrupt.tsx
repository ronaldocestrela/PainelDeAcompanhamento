import DealsDataContainer from "./DealsDataContainer";import DealsDataContainer from "./DealsDataContainer";import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";



export default function DealsPage() {

  return <DealsDataContainer />;

}export default function DealsPage() {import AddIcon from "@mui/icons-material/Add";

  return <DealsDataContainer />;

}import { useCreateDeal, useDeals } from "../../lib/hooks/useDeals";import AddIcon from "@mui/icons-material/Add";import AddIcon from "@mui/icons-material/Add";

import type { CreateDealData } from "../../lib/types";

import ListPageLayoutDeals from "./ListPageLayoutDeals";import { useCreateDeal, useDeals } from "../../lib/hooks/useDeals";import { useCreateDeal, useDeals } from "../../lib/hooks/useDeals";

import DealsList from "./DealsList";

import type { CreateDealData } from "../../lib/types";import type { CreateDealData } from "../../lib/types";

export default function DealsPage() {

  const { data: deals = [], isLoading, error } = useDeals();import ListPageLayoutDeals from "./ListPageLayoutDeals";import ListPageLayoutDeals from "./ListPageLayoutDeals";

  const createDealMutation = useCreateDeal();

import DealsList from "./DealsList";import DealsList from "./DealsList";

  // Dados fictícios para demonstração enquanto não há dados reais

  const mockDeals = deals.length === 0 && !isLoading ? [

    {

      id: '1',export default function DealsPage() {export default function DealsPage() {

      bookmakerName: 'Bet365',

      companyName: 'LSK Tech',  const { data: deals = [], isLoading, error } = useDeals();  const { data: deals = [], isLoading, error } = useDeals();

      revValueExpert: 25.5,

      revValueAgency: 15.0,  const createDealMutation = useCreateDeal();  const createDealMutation = useCreateDeal();

      nplValueExpert: 30.0,

      nplValueAgency: 20.0,

      cpaValueExpert: 150.0,

      cpaValueAgency: 100.0,  // Dados fictícios para demonstração enquanto não há dados reais  // Dados fictícios para demonstração enquanto não há dados reais

      depositBonusExpert: 50.0,

      depositBonusAgency: 30.0,  const mockDeals = deals.length === 0 && !isLoading ? [  const mockDeals = deals.length === 0 && !isLoading ? [

      bookmakerId: '1080ed55-4d91-4caf-914f-72288c1c489b',

      expertId: 'ef612a18-a563-48df-a174-e7b62a890fc9',    {    {

    },

    {      id: '1',      id: '1',

      id: '2',

      bookmakerName: 'Betano',      bookmakerName: 'Bet365',      bookmakerName: 'Bet365',

      companyName: 'Digital Partners',

      revValueExpert: 28.0,      companyName: 'LSK Tech',      companyName: 'LSK Tech',

      revValueAgency: 18.0,

      nplValueExpert: 35.0,      revValueExpert: 25.5,      revValueExpert: 25.5,

      nplValueAgency: 25.0,

      cpaValueExpert: 180.0,      revValueAgency: 15.0,      revValueAgency: 15.0,

      cpaValueAgency: 120.0,

      depositBonusExpert: 60.0,      nplValueExpert: 30.0,      nplValueExpert: 30.0,

      depositBonusAgency: 40.0,

      bookmakerId: '2a8f7b3c-5e91-4d2b-8c6f-9e5a4b7d2c8e',      nplValueAgency: 20.0,      nplValueAgency: 20.0,

      expertId: '7f2e9a6b-8c4d-4e1a-9b7c-3f8e5a2d6b9c',

    },      cpaValueExpert: 150.0,      cpaValueExpert: 150.0,

    {

      id: '3',      cpaValueAgency: 100.0,      cpaValueAgency: 100.0,

      bookmakerName: 'Sportingbet',

      companyName: 'Gaming Solutions',      depositBonusExpert: 50.0,      depositBonusExpert: 50.0,

      revValueExpert: 22.0,

      revValueAgency: 12.0,      depositBonusAgency: 30.0,      depositBonusAgency: 30.0,

      nplValueExpert: 28.0,

      nplValueAgency: 18.0,      bookmakerId: '1080ed55-4d91-4caf-914f-72288c1c489b',      bookmakerId: '1080ed55-4d91-4caf-914f-72288c1c489b',

      cpaValueExpert: 140.0,

      cpaValueAgency: 90.0,      expertId: 'ef612a18-a563-48df-a174-e7b62a890fc9',      expertId: 'ef612a18-a563-48df-a174-e7b62a890fc9',

      depositBonusExpert: 45.0,

      depositBonusAgency: 25.0,    },    },

      bookmakerId: '4e9c2a7f-6b1d-4a8e-9c5b-2f7a8d3e6c9b',

      expertId: '9b6e4c2a-7f8d-4e1b-8c9a-5d2f7e6a9c4b',    {    {

    },

  ] : deals;      id: '2',      id: '2',



  const handleCreateDeal = () => {      bookmakerName: 'Betano',      bookmakerName: 'Betano',

    const dealData: CreateDealData = {

      bookmakerName: "Casa XDD",      companyName: 'Digital Partners',      companyName: 'Digital Partners',

      revValueExpert: 50.0,

      revValueAgency: 50.0,      revValueExpert: 28.0,      revValueExpert: 28.0,

      nplValueExpert: 50.0,

      nplValueAgency: 50.0,      revValueAgency: 18.0,      revValueAgency: 18.0,

      cpaValueExpert: 50.0,

      cpaValueAgency: 50.0,      nplValueExpert: 35.0,      nplValueExpert: 35.0,

      depositBonusExpert: 50.0,

      depositBonusAgency: 50.0,      nplValueAgency: 25.0,      nplValueAgency: 25.0,

      bookmakerId: "1080ed55-4d91-4caf-914f-72288c1c489b",

      expertId: "ef612a18-a563-48df-a174-e7b62a890fc9",      cpaValueExpert: 180.0,      cpaValueExpert: 180.0,

      initialDate: "2025-08-01",

    };      cpaValueAgency: 120.0,      cpaValueAgency: 120.0,



    createDealMutation.mutate(dealData);      depositBonusExpert: 60.0,      depositBonusExpert: 60.0,

  };

      depositBonusAgency: 40.0,      depositBonusAgency: 40.0,

  if (error) {

    return (      bookmakerId: '2a8f7b3c-5e91-4d2b-8c6f-9e5a4b7d2c8e',      bookmakerId: '2a8f7b3c-5e91-4d2b-8c6f-9e5a4b7d2c8e',

      <Alert severity="error">

        Erro ao carregar acordos: {error.message}      expertId: '7f2e9a6b-8c4d-4e1a-9b7c-3f8e5a2d6b9c',      expertId: '7f2e9a6b-8c4d-4e1a-9b7c-3f8e5a2d6b9c',

      </Alert>

    );    },    },

  }

    {    {

  if (isLoading) {

    return (      id: '3',      id: '3',

      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>

        <CircularProgress />      bookmakerName: 'Sportingbet',      bookmakerName: 'Sportingbet',

      </Box>

    );      companyName: 'Gaming Solutions',      companyName: 'Gaming Solutions',

  }

      revValueExpert: 22.0,      revValueExpert: 22.0,

  return (

    <ListPageLayoutDeals      revValueAgency: 12.0,      revValueAgency: 12.0,

      title="Acordos"

      actionButton={      nplValueExpert: 28.0,      nplValueExpert: 28.0,

        <Button

          variant="contained"      nplValueAgency: 18.0,      nplValueAgency: 18.0,

          startIcon={<AddIcon />}

          onClick={handleCreateDeal}      cpaValueExpert: 140.0,      cpaValueExpert: 140.0,

          disabled={createDealMutation.isPending}

        >      cpaValueAgency: 90.0,      cpaValueAgency: 90.0,

          Novo Acordo

        </Button>      depositBonusExpert: 45.0,      depositBonusExpert: 45.0,

      }

    >      depositBonusAgency: 25.0,      depositBonusAgency: 25.0,

      {mockDeals.length === 0 ? (

        <Box sx={{ textAlign: "center", mt: 4 }}>      bookmakerId: '4e9c2a7f-6b1d-4a8e-9c5b-2f7a8d3e6c9b',      bookmakerId: '4e9c2a7f-6b1d-4a8e-9c5b-2f7a8d3e6c9b',

          <Typography variant="h6" gutterBottom>

            Nenhum acordo cadastrado      expertId: '9b6e4c2a-7f8d-4e1b-8c9a-5d2f7e6a9c4b',      expertId: '9b6e4c2a-7f8d-4e1b-8c9a-5d2f7e6a9c4b',

          </Typography>

          <Typography variant="body1" color="text.secondary">    },    },

            Clique em "Novo Acordo" para criar seu primeiro acordo.

          </Typography>    {    {

        </Box>

      ) : (      id: '4',      id: '4',

        <DealsList deals={mockDeals} isLoading={isLoading} />

      )}      bookmakerName: 'Betfair',      bookmakerName: 'Betfair',

    </ListPageLayoutDeals>

  );      companyName: 'Pro Gaming Ltd',      companyName: 'Pro Gaming Ltd',

}
      revValueExpert: 32.0,      revValueExpert: 32.0,

      revValueAgency: 22.0,      revValueAgency: 22.0,

      nplValueExpert: 40.0,      nplValueExpert: 40.0,

      nplValueAgency: 30.0,      nplValueAgency: 30.0,

      cpaValueExpert: 200.0,      cpaValueExpert: 200.0,

      cpaValueAgency: 150.0,      cpaValueAgency: 150.0,

      depositBonusExpert: 75.0,      depositBonusExpert: 75.0,

      depositBonusAgency: 50.0,      depositBonusAgency: 50.0,

      bookmakerId: '8c5e2b9f-4a7d-4e2c-9b6a-1f8e5d3c7a9e',      bookmakerId: '8c5e2b9f-4a7d-4e2c-9b6a-1f8e5d3c7a9e',

      expertId: '6a9c4e2b-8f7d-4a1e-9c5b-3e8f2a6d9c4b',      expertId: '6a9c4e2b-8f7d-4a1e-9c5b-3e8f2a6d9c4b',

    },    },

    {    {

      id: '5',      id: '5',

      bookmakerName: 'KTO',      bookmakerName: 'KTO',

      companyName: 'Expert Marketing',      companyName: 'Expert Marketing',

      revValueExpert: 26.5,      revValueExpert: 26.5,

      revValueAgency: 16.5,      revValueAgency: 16.5,

      nplValueExpert: 32.0,      nplValueExpert: 32.0,

      nplValueAgency: 22.0,      nplValueAgency: 22.0,

      cpaValueExpert: 160.0,      cpaValueExpert: 160.0,

      cpaValueAgency: 110.0,      cpaValueAgency: 110.0,

      depositBonusExpert: 55.0,      depositBonusExpert: 55.0,

      depositBonusAgency: 35.0,      depositBonusAgency: 35.0,

      bookmakerId: '3f7a9c2e-6d4b-4a8e-9c2f-7a5e8d1c6b9a',      bookmakerId: '3f7a9c2e-6d4b-4a8e-9c2f-7a5e8d1c6b9a',

      expertId: '2c8f5a9e-7b4d-4e1a-9c6b-5f2a7e8d3c9b',      expertId: '2c8f5a9e-7b4d-4e1a-9c6b-5f2a7e8d3c9b',

    },    },

  ] : deals;  ] : deals;



  const handleCreateDeal = () => {  const handleCreateDeal = () => {

    // Valores fictícios para teste    // Valores fictícios para teste

    const dealData: CreateDealData = {    const dealData: CreateDealData = {

      bookmakerName: "Casa XDD",      bookmakerName: "Casa XDD",

      revValueExpert: 50.0,      revValueExpert: 50.0,

      revValueAgency: 50.0,      revValueAgency: 50.0,

      nplValueExpert: 50.0,      nplValueExpert: 50.0,

      nplValueAgency: 50.0,      nplValueAgency: 50.0,

      cpaValueExpert: 50.0,      cpaValueExpert: 50.0,

      cpaValueAgency: 50.0,      cpaValueAgency: 50.0,

      depositBonusExpert: 50.0,      depositBonusExpert: 50.0,

      depositBonusAgency: 50.0,      depositBonusAgency: 50.0,

      bookmakerId: "1080ed55-4d91-4caf-914f-72288c1c489b",      bookmakerId: "1080ed55-4d91-4caf-914f-72288c1c489b",

      expertId: "ef612a18-a563-48df-a174-e7b62a890fc9",      expertId: "ef612a18-a563-48df-a174-e7b62a890fc9",

      initialDate: "2025-08-01",      initialDate: "2025-08-01",

    };    };



    createDealMutation.mutate(dealData, {    createDealMutation.mutate(dealData, {

      onSuccess: () => {      onSuccess: () => {

        console.log("Deal criado com sucesso!");        console.log("Deal criado com sucesso!");

      },      },

      onError: (error) => {      onError: (error) => {

        console.error("Erro ao criar deal:", error);        console.error("Erro ao criar deal:", error);

      },      },

    });    });

  };  };



  if (error) {  if (error) {

    return (    return (

      <Box sx={{ p: { xs: 2, sm: 3 } }}>      <Box sx={{ p: { xs: 2, sm: 3 } }}>

        <Alert severity="error">        <Alert severity="error">

          Erro ao carregar acordos: {error.message}          Erro ao carregar acordos: {error.message}

        </Alert>        </Alert>

      </Box>      </Box>

    );    );

  }  }



  if (isLoading) {  if (isLoading) {

    return (    return (

      <Box      <Box

        sx={{        sx={{

          display: "flex",          display: "flex",

          justifyContent: "center",          justifyContent: "center",

          alignItems: "center",          alignItems: "center",

          minHeight: "200px",          minHeight: "200px",

        }}        }}

      >      >

        <CircularProgress />        <CircularProgress />

      </Box>      </Box>

    );    );

  }  }



  return (  return (

    <>    <>

      <ListPageLayoutDeals      <ListPageLayoutDeals

        title="Acordos"        title="Acordos"

        actionButton={        actionButton={

          <Button          <Button

            variant="contained"            variant="contained"

            startIcon={<AddIcon />}            startIcon={<AddIcon />}

            onClick={handleCreateDeal}            onClick={handleCreateDeal}

            disabled={createDealMutation.isPending}            disabled={createDealMutation.isPending}

          >          >

            Novo Acordo            Novo Acordo

          </Button>          </Button>

        }        }

      >      >

        {/* Mensagens de feedback */}        {/* Mensagens de feedback */}

        {createDealMutation.isSuccess && (        {createDealMutation.isSuccess && (

          <Alert severity="success" sx={{ mb: 2 }}>          <Alert severity="success" sx={{ mb: 2 }}>

            Deal criado com sucesso!            Deal criado com sucesso!

          </Alert>          </Alert>

        )}        )}



        {createDealMutation.isError && (        {createDealMutation.isError && (

          <Alert severity="error" sx={{ mb: 2 }}>          <Alert severity="error" sx={{ mb: 2 }}>

            Erro ao criar deal: {createDealMutation.error?.message}            Erro ao criar deal: {createDealMutation.error?.message}

          </Alert>          </Alert>

        )}        )}



        {mockDeals.length === 0 ? (        {mockDeals.length === 0 ? (

          <Box sx={{ textAlign: "center", mt: 4 }}>          <Box sx={{ textAlign: "center", mt: 4 }}>

            <Typography variant="h6" gutterBottom>            <Typography variant="h6" gutterBottom>

              Nenhum acordo cadastrado              Nenhum acordo cadastrado

            </Typography>            </Typography>

            <Typography variant="body1" color="text.secondary">            <Typography variant="body1" color="text.secondary">

              Clique em "Novo Acordo" para criar seu primeiro acordo.              Clique em "Novo Acordo" para criar seu primeiro acordo.

            </Typography>            </Typography>

          </Box>          </Box>

        ) : (        ) : (

          <DealsList deals={mockDeals} isLoading={isLoading} />          <DealsList deals={mockDeals} isLoading={isLoading} />

        )}        )}

      </ListPageLayoutDeals>      </ListPageLayoutDeals>

    </>    </>

  );  );

}}