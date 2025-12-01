import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import { useExperts } from "../../lib/hooks/useExperts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import type { Product } from "../../lib/types";

interface EditProductsModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (
    id: string,
    data: { name: string; externalId: string; expertId: string }
  ) => Promise<void>;
  isSubmitting: boolean;
  productToEdit: Product | null;
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

export default function EditProductsModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  productToEdit,
}: EditProductsModalProps) {
  const { control, handleSubmit, reset, setValue, watch } = useForm<{
    name: string;
    externalId: string;
    expertId: string;
  }>({
    mode: "onTouched",
    defaultValues: { name: "", externalId: "", expertId: "" },
  });

  const { projects: expertsList = [], isLoading: isLoadingExperts } =
    useExperts();
  const selectedExpert = watch("expertId");

  useEffect(() => {
    if (productToEdit) {
      setValue("name", productToEdit.name || "");
      setValue("externalId", productToEdit.externalId || "");
      setValue("expertId", productToEdit.expertId || "");
    }
    if (!open) {
      reset();
    }
  }, [productToEdit, open, reset, setValue]);

  const onSubmit = async (data: {
    name: string;
    externalId: string;
    expertId: string;
  }) => {
    if (!productToEdit) return;
    try {
      await onUpdate(productToEdit.id, {
        name: data.name,
        externalId: data.externalId,
        expertId: data.expertId,
      });
    } catch (error) {
      console.error("Falha ao atualizar produto:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao atualizar produto. Tente novamente.";
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
      aria-labelledby="edit-product-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="edit-product-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Produto
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            autoFocus
            label="Nome do Produto"
            name="name"
            fullWidth
          />
          <TextInput
            control={control}
            label="ID Externo"
            name="externalId"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="expert-select-label">Expert</InputLabel>
            <Select
              labelId="expert-select-label"
              value={selectedExpert}
              onChange={(e) => setValue("expertId", e.target.value as string)}
              label="Expert"
              disabled={isLoadingExperts}
            >
              {expertsList?.map((expert: any) => (
                <MenuItem key={expert.id} value={expert.id}>
                  {expert.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
