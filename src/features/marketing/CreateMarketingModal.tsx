import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextInput from "../../app/shared/components/TextInput";
import { useExperts } from "../../lib/hooks/useExperts";
import { useMarketingActions } from "../../lib/hooks/useMarketing";
import type { MarketingActionCreate } from "../../lib/types";
import { useState } from "react";

interface CreateMarketingModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: MarketingActionCreate) => Promise<void>;
  isSubmitting?: boolean;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function CreateMarketingModal({
  open,
  onClose,
  onCreate,
  isSubmitting = false,
}: CreateMarketingModalProps) {
  const { projects: experts = [], isLoading } = useExperts();
  const { createMarketingAction } = useMarketingActions();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, reset, formState, setValue, watch } =
    useForm<MarketingActionCreate>({
      defaultValues: {
        expertId: "",
        name: "",
        startDate: "",
        endDate: "",
        isActive: true,
        description: "",
      },
    });

  const handleInternalClose = () => {
    reset();
    setError(null);
    onClose();
  };

  const onSubmit = async (data: MarketingActionCreate) => {
    setError(null);
    try {
      if (!data.expertId || !data.name || !data.startDate || !data.endDate) {
        setError("Preencha todos os campos obrigatórios.");
        return;
      }
      if (onCreate) {
        await onCreate(data);
      } else {
        await createMarketingAction.mutateAsync(data);
        handleInternalClose();
      }
    } catch (err: any) {
      setError(err?.message || "Erro ao criar ação de marketing.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleInternalClose}
      aria-labelledby="create-marketing-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-marketing-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Nova Ação de Marketing
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            name="expertId"
            label="Expert"
            select
            fullWidth
            required
            error={!!formState.errors?.expertId}
            helperText={
              formState.errors?.expertId?.message || "Selecione o expert"
            }
            SelectProps={{ native: false }}
          >
            <MenuItem value="" disabled>
              Selecione um expert
            </MenuItem>
            {isLoading ? (
              <MenuItem value="" disabled>
                Carregando experts...
              </MenuItem>
            ) : (
              experts.map((expert) => (
                <MenuItem key={expert.id} value={expert.id}>
                  {expert.name}
                </MenuItem>
              ))
            )}
          </TextInput>
          <TextInput
            control={control}
            name="name"
            label="Nome"
            fullWidth
            required
            error={!!formState.errors?.name}
            helperText={formState.errors?.name?.message}
          />
          <TextInput
            control={control}
            name="startDate"
            label="Data de Início"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors?.startDate}
            helperText={formState.errors?.startDate?.message}
          />
          <TextInput
            control={control}
            name="endDate"
            label="Data de Fim"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors?.endDate}
            helperText={formState.errors?.endDate?.message}
          />
          <TextInput
            control={control}
            name="isActive"
            label="Ativo?"
            select
            fullWidth
            required
            error={!!formState.errors?.isActive}
            helperText={formState.errors?.isActive?.message}
            SelectProps={{ native: false }}
            onChange={(e) => {
              const value = e.target.value === "true";
              setValue("isActive", value);
            }}
            value={String(watch("isActive"))}
          >
            <MenuItem value={"true"}>Sim</MenuItem>
            <MenuItem value={"false"}>Não</MenuItem>
          </TextInput>
          <TextInput
            control={control}
            name="description"
            label="Descrição"
            fullWidth
            multiline
            minRows={2}
            error={!!formState.errors?.description}
            helperText={formState.errors?.description?.message}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
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
