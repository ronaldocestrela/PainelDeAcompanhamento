import { Box, Button, Modal, Typography, Stack } from "@mui/material"; 
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createHouseSchema, 
  type CreateHouseSchema,
} from "../../lib/schemas/createHouseSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";
import type { ListBookmakers } from "../../lib/types";

interface EditHouseModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: CreateHouseSchema) => Promise<void>;
  isSubmitting: boolean;
  houseToEdit: ListBookmakers | null; 
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

export default function EditHouseModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  houseToEdit,
}: EditHouseModalProps) {
  const { control, reset, handleSubmit, setValue } =
    useForm<CreateHouseSchema>({
      mode: "onTouched",
      resolver: zodResolver(createHouseSchema),
      defaultValues: {
        name: "",
        logoUrl: "", 
      },
    });

  useEffect(() => {
    if (open && houseToEdit) {
      setValue("name", houseToEdit.name);
      setValue("logoUrl", houseToEdit.logoUrl || ""); 
    } else if (!open) {
      reset({ name: "", logoUrl: "" }); 
    }
  }, [open, houseToEdit, reset, setValue]);

  const onSubmitHandle = async (data: CreateHouseSchema) => {
    if (!houseToEdit) return;
    try {
      await onUpdate(houseToEdit.id, data);
    } catch (error) {
      console.error("Falha ao atualizar casa de aposta:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-house-modal-title" 
    >
      <Box sx={modalStyle}>
        <Typography
          id="edit-house-modal-title" 
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Casa de Aposta
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
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