import { Box, Button, Modal, Typography, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAnalystSchema,
  type CreateAnalystSchema,
} from "../../lib/schemas/createAnalysticSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";

interface CreateAnalystsModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateAnalystSchema) => Promise<void>;
  isSubmitting: boolean;
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

export default function CreateAnalystsModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateAnalystsModalProps) {
  const { control, reset, handleSubmit } = useForm<CreateAnalystSchema>({
    mode: "onTouched",
    resolver: zodResolver(createAnalystSchema),
    defaultValues: {
      name: "",
      photoUrl: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset({ name: "", photoUrl: "" });
    }
  }, [open, reset]);

const onSubmitHandle = async (data: CreateAnalystSchema) => {
    try {
      await onCreate(data);
    } catch (error) {
      console.error(
        "Falha ao submeter formulário de criação de analista:",
        error
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-analyst-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-analyst-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Novo Analista
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <TextInput
            control={control}
            autoFocus
            label="Nome do Analista"
            name="name"
            fullWidth
          />
          {/* <TextInput
            control={control}
            label="URL da Foto"
            name="photoUrl"
            fullWidth
          /> */}
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
