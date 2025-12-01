import { Box, Button, Modal, Typography, Stack, TextField, MenuItem } from "@mui/material";
import type { CreateCampaing, SelectOption } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCampaingSchema,
  type CreateCampaingSchema,
} from "../../lib/schemas/createCampaingSchema";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";

interface CreateCampaingsModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateCampaing) => Promise<void>;
  isSubmitting: boolean;
  expertsList: SelectOption[] | undefined;
  analystsList: SelectOption[] | undefined;
}

const modalStyle = {
  position: "absolute",
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

export default function CreateCampaingModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
  expertsList,
  analystsList,
}: CreateCampaingsModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ // Removido <CreateCampaingSchema> para permitir inferência de tipo
    mode: "onTouched",
    resolver: zodResolver(createCampaingSchema),
    defaultValues: {
      Name: "",
      ExpertId: "",
      AnalystId: "",
      BookmakerId: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmitHandle = async (data: CreateCampaingSchema) => {
    try {
      await onCreate(data);
    } catch (error) {
      console.error("Falha ao criar campanha:", error);

      alert(error instanceof Error ? error.message : "Erro ao criar campanha.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-campaing-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-campaing-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Nova Campanha
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <TextInput
            control={control}
            autoFocus
            label="Nome da Campanha"
            name="Name"
            error={!!errors.Name}
            helperText={errors.Name?.message}
          />

          <Controller
            control={control}
            name="ExpertId"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Expert (Opcional)"
                select
                fullWidth
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {expertsList?.map((expert) => (
                  <MenuItem key={expert.id} value={expert.id}>
                    {expert.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="AnalystId"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Analista (Opcional)"
                select
                fullWidth
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {analystsList?.map((analyst) => (
                  <MenuItem key={analyst.id} value={analyst.id}>
                    {analyst.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
