import { Box, Button, Modal, Typography, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCompanySchema,
  type CreateCompanySchema,
} from "../../lib/schemas/createCompanySchema";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateCompanySchema) => Promise<void>;
  isSubmitting: boolean;
}

const modalStyle = {
  position: "absolute",
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

export default function CreateCompanyModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateCompanyModalProps) {
  const { control, reset, handleSubmit } = useForm<CreateCompanySchema>({
    mode: "onTouched",
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      host: "",
      tituloPagina: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset({ name: "", host: "", tituloPagina: "" });
    }
  }, [open, reset]);

  const onSubmitHandle = async (data: CreateCompanySchema) => {
    try {
      await onCreate(data);
    } catch (error) {
      console.error(
        "Falha ao submeter formulário de criação de empresa:",
        error
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-company-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-company-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Nova Empresa
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                autoFocus
                label="Nome da Empresa"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="host"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Host"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="tituloPagina"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Título da Página"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="logoHeader"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="file"
                inputProps={{ accept: "image/*" }}
                label="Logo Header"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  field.onChange(files ? files[0] : undefined);
                }}
              />
            )}
          />
          <Controller
            name="logoMenuLateral"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="file"
                inputProps={{ accept: "image/*" }}
                label="Logo Menu Lateral"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  field.onChange(files ? files[0] : undefined);
                }}
              />
            )}
          />
          <Controller
            name="favicon"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="file"
                inputProps={{ accept: "image/*" }}
                label="Favicon"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  field.onChange(files ? files[0] : undefined);
                }}
              />
            )}
          />
          <Controller
            name="logoLogin"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="file"
                inputProps={{ accept: "image/*" }}
                label="Logo Login"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  field.onChange(files ? files[0] : undefined);
                }}
              />
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