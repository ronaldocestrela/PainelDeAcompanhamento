import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import {
  createHouseSchema,
  type CreateHouseSchema,
} from "../../lib/schemas/createHouseSchema";
import type { CreateBookmakers } from "../../lib/types";

interface CreateHouseModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (houseData: CreateBookmakers) => Promise<void>;
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
} as const;

export default function CreateHouseModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateHouseModalProps) {
  const { control, handleSubmit, reset } = useForm<CreateHouseSchema>({ 
    mode: "onTouched",
    resolver: zodResolver(createHouseSchema),
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateHouseSchema) => { 
    try {
      await onCreate({ name: data.name });
    } catch (error) {
      console.error("Falha ao criar casa de aposta:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar casa de aposta. Tente novamente.";
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
      aria-labelledby="create-house-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-house-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Nova Casa de Aposta
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            autoFocus
            label="Nome da Casa"
            name="name"
            fullWidth
          />
          {/* <TextInput
            control={control}
            label="URL do Logo"
            name="logoUrl"
            fullWidth
          /> */}
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
