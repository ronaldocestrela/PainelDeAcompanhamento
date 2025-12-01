import { useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type { ExpertCreate } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import {
  createExpertSchema,
  type CreateExpertSchema,
} from "../../lib/schemas/createExpertSchema";
interface CreateExpertModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (expertData: ExpertCreate) => Promise<void>;
  isSubmitting: boolean;
}

const modalStyle = {
  position: "absolute" as "absolute",
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

export default function CreateExpertModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateExpertModalProps) {
  const { control, handleSubmit, reset } = useForm<CreateExpertSchema>({
    mode: "onTouched",
    resolver: zodResolver(createExpertSchema),
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateExpertSchema) => {
    try {
      await onCreate(data);
    } catch (error) {
      console.error("Falha ao criar expert:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar expert. Tente novamente.";
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
      aria-labelledby="create-expert-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-expert-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Novo Expert
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            autoFocus
            label="Nome do Expert"
            name="name"
            fullWidth
          />
          <TextInput
            control={control}
            label="URL da Foto"
            name="photoUrl"
            fullWidth
          />
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
              {isSubmitting ? "Criando..." : "Criar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
