import { Box, Button, Modal, Typography, Stack } from "@mui/material";
import type { ExpertDetail } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createExpertSchema,
  type CreateExpertSchema,
} from "../../lib/schemas/createExpertSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";

interface EditExpertsModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: CreateExpertSchema) => Promise<void>;
  isSubmitting: boolean;
  expertToEdit: ExpertDetail | null;
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

export default function EditExpertsModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  expertToEdit,
}: EditExpertsModalProps) {
  const { control, reset, handleSubmit, setValue } =
    useForm<CreateExpertSchema>({
      mode: "onTouched",
      resolver: zodResolver(createExpertSchema),
      defaultValues: {
        name: "",
        photoUrl: "",
      },
    });

  useEffect(() => {
    if (open && expertToEdit) {
      setValue("name", expertToEdit.name);
      setValue("photoUrl", expertToEdit.photoUrl || "");
    } else if (!open) {
      reset({ name: "", photoUrl: "" });
    }
  }, [open, expertToEdit, reset, setValue]);

  const onSubmitHandle = async (data: CreateExpertSchema) => {
    if (!expertToEdit) return;
    try {
      await onUpdate(expertToEdit.id, data);
    } catch (error) {
      console.error("Falha ao atualizar expert:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-expert-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="edit-expert-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Expert
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
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
            <Button onClick={onClose} disabled={isSubmitting}>
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
