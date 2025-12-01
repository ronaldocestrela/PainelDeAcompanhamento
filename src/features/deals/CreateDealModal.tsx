import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextInput from "../../app/shared/components/TextInput";
import type { CreateDealData } from "../../lib/types";

interface CreateDealModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (dealData: CreateDealForm) => Promise<void>;
  isSubmitting: boolean;
  houses: { id: string; name: string }[];
  isLoadingHouses?: boolean;
  experts: { id: string; name: string }[];
  isLoadingExperts?: boolean;
}

type CreateDealForm = {
  bookmakerName: string;
  revValueExpert: number;
  revValueAgency: number;
  cpaValueExpert: number;
  cpaValueAgency: number;
  depositBonusExpert: number;
  depositBonusAgency: number;
  bookmakerId: string;
  expertId: string;
  initialDate: string;
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function CreateDealModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
  houses = [],
  isLoadingHouses = false,
  experts = [],
  isLoadingExperts = false,
}: CreateDealModalProps) {
  const { control, handleSubmit, reset, formState, watch } = useForm<CreateDealForm>({
    defaultValues: {
      bookmakerName: "",
      revValueExpert: 0,
      revValueAgency: 0,
      cpaValueExpert: 0,
      cpaValueAgency: 0,
      depositBonusExpert: 0,
      depositBonusAgency: 0,
      bookmakerId: "",
      expertId: "",
      initialDate: "",
    },
  });

  const selectedBookmakerId = watch("bookmakerId");

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  // Atualiza o nome da casa de apostas automaticamente quando uma é selecionada
  useEffect(() => {
    if (selectedBookmakerId) {
      const selectedHouse = houses.find(house => house.id === selectedBookmakerId);
      if (selectedHouse) {
        // Aqui você pode usar setValue se quiser atualizar o campo automaticamente
        // setValue("bookmakerName", selectedHouse.name);
      }
    }
  }, [selectedBookmakerId, houses]);

  const onSubmit = async (data: CreateDealForm) => {
    try {
      // Encontrar o nome da casa de apostas selecionada
      const selectedHouse = houses.find(house => house.id === data.bookmakerId);
      
      // Converter strings para números e preparar payload
      const payload: CreateDealData = {
        bookmakerName: selectedHouse?.name || data.bookmakerName,
        revValueExpert: data.revValueExpert,
        revValueAgency: data.revValueAgency,
        cpaValueExpert: data.cpaValueExpert,
        cpaValueAgency: data.cpaValueAgency,
        depositBonusExpert: data.depositBonusExpert,
        depositBonusAgency: data.depositBonusAgency,
        bookmakerId: data.bookmakerId,
        expertId: data.expertId,
        initialDate: data.initialDate,
      };

      await onCreate(payload as any);
    } catch (error) {
      console.error("Falha ao criar acordo:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar acordo. Tente novamente.";
      alert(errorMessage);
    }
  };

  const handleInternalClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleInternalClose}
      aria-labelledby="create-deal-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-deal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Novo Acordo
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Casa de Apostas */}
          <TextInput
            control={control}
            name="bookmakerId"
            label="Casa de Apostas"
            select
            fullWidth
            error={!!formState.errors?.bookmakerId}
            helperText={
              formState.errors?.bookmakerId?.message || "Selecione uma casa de apostas"
            }
            SelectProps={{ native: false }}
          >
            {isLoadingHouses ? (
              <MenuItem value="" disabled>
                Carregando casas de apostas...
              </MenuItem>
            ) : (
              [
                <MenuItem value="" disabled key="default">
                  Selecione uma casa de apostas
                </MenuItem>,
                ...houses.map((house) => (
                  <MenuItem key={house.id} value={house.id}>
                    {house.name}
                  </MenuItem>
                )),
              ]
            )}
          </TextInput>

          {/* Expert/Projeto */}
          <TextInput
            control={control}
            name="expertId"
            label="Expert/Projeto"
            select
            fullWidth
            error={!!formState.errors?.expertId}
            helperText={
              formState.errors?.expertId?.message || "Selecione um expert/projeto"
            }
            SelectProps={{ native: false }}
          >
            {isLoadingExperts ? (
              <MenuItem value="" disabled>
                Carregando experts...
              </MenuItem>
            ) : (
              [
                <MenuItem value="" disabled key="default">
                  Selecione um expert/projeto
                </MenuItem>,
                ...experts.map((expert) => (
                  <MenuItem key={expert.id} value={expert.id}>
                    {expert.name}
                  </MenuItem>
                )),
              ]
            )}
          </TextInput>

          {/* Data Inicial */}
          <TextInput
            control={control}
            name="initialDate"
            label="Data do início do acordo"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors?.initialDate}
            helperText={formState.errors?.initialDate?.message}
          />

          {/* Valores Expert */}
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Valores Expert
          </Typography>
          
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextInput
              control={control}
              name="revValueExpert"
              label="Rev Expert (%)"
              type="number"
              fullWidth
              error={!!formState.errors?.revValueExpert}
              helperText={formState.errors?.revValueExpert?.message}
              inputProps={{ step: "0.01" }}
            />
            <TextInput
              control={control}
              name="cpaValueExpert"
              label="CPA Expert (R$)"
              type="number"
              fullWidth
              error={!!formState.errors?.cpaValueExpert}
              helperText={formState.errors?.cpaValueExpert?.message}
              inputProps={{ step: "0.01" }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
           
            <TextInput
              control={control}
              name="depositBonusExpert"
              label="Bônus Depósito Expert (R$)"
              type="number"
              fullWidth
              error={!!formState.errors?.depositBonusExpert}
              helperText={formState.errors?.depositBonusExpert?.message}
              inputProps={{ step: "0.01" }}
            />
          </Stack>

          {/* Valores Agência */}
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Valores Agência
          </Typography>
          
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextInput
              control={control}
              name="revValueAgency"
              label="Rev Agência (%)"
              type="number"
              fullWidth
              error={!!formState.errors?.revValueAgency}
              helperText={formState.errors?.revValueAgency?.message}
              inputProps={{ step: "0.01" }}
            />
            <TextInput
              control={control}
              name="cpaValueAgency"
              label="CPA Agência (R$)"
              type="number"
              fullWidth
              error={!!formState.errors?.cpaValueAgency}
              helperText={formState.errors?.cpaValueAgency?.message}
              inputProps={{ step: "0.01" }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextInput
              control={control}
              name="depositBonusAgency"
              label="Bônus Depósito Agência (R$)"
              type="number"
              fullWidth
              error={!!formState.errors?.depositBonusAgency}
              helperText={formState.errors?.depositBonusAgency?.message}
              inputProps={{ step: "0.01" }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button onClick={handleInternalClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}