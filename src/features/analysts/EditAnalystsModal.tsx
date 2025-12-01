import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
} from '@mui/material';
import type { DeatailAnalyst } from '../../lib/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnalystSchema, type CreateAnalystSchema } from '../../lib/schemas/createAnalysticSchema'; 
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import TextInput from '../../app/shared/components/TextInput';

interface EditAnalystsModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: CreateAnalystSchema) => Promise<void>;
  isSubmitting: boolean;
  analystToEdit: DeatailAnalyst | null;
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

export default function EditAnalystsModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  analystToEdit,
}: EditAnalystsModalProps) {
  const { control, reset, handleSubmit, setValue } = useForm<CreateAnalystSchema>({
    mode: "onTouched",
    resolver: zodResolver(createAnalystSchema),
    defaultValues: {
      name: "",
      photoUrl: "",
    }
  });

  useEffect(() => {
    if (open && analystToEdit) {
      setValue("name", analystToEdit.name);
      setValue("photoUrl", analystToEdit.photoUrl || "");
    } else if (!open) {
      reset({ name: "", photoUrl: "" });
    }
  }, [open, analystToEdit, reset, setValue]);

  const onSubmitHandle = async (data: CreateAnalystSchema) => {
    if (!analystToEdit) return;
    try {
      await onUpdate(analystToEdit.id, data);
    } catch (error) {
      console.error("Falha ao atualizar analista:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-analyst-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography id="edit-analyst-modal-title" variant="h6" component="h2" gutterBottom>
          Editar Analista
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmitHandle)}>
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
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}