import { useEffect } from "react";
import { useExperts } from "../../lib/hooks/useExperts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../../lib/schemas/createProductsSchema";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import type { ExpertList, ProductCreate } from "../../lib/types";
// import type { ProductCreate } from "../../lib/types";

interface CreateProductsModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (productData: ProductCreate) => Promise<void>;
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

export default function CreateProductsModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateProductsModalProps) {
  const { control, handleSubmit, reset, formState, setValue, watch } = useForm<{
    name: string;
    externalId?: string;
    expertId: string;
    hublaExternalId?: string;
  }>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
    defaultValues: { expertId: "" },
  });

  const { projects: expertsList, isLoading: isLoadingExperts } = useExperts();
  const selectedExpert = watch("expertId");

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: {
    name: string;
    externalId?: string;
    expertId?: string;
    hublaExternalId?: string;
  }) => {
    try {
      await onCreate({
        name: data.name,
        externalId: data.externalId ?? "",
        expertId: data.expertId ?? "",
        hublaExternalId: data.hublaExternalId ?? "",
      });
    } catch (error) {
      console.error("Falha ao criar produto:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar produto. Tente novamente.";
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
      aria-labelledby="create-product-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-product-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Novo Produto
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            autoFocus
            label="Nome do Produto"
            name="name"
            fullWidth
            error={!!formState.errors.name}
            helperText={formState.errors.name?.message}
          />
          <TextInput
            control={control}
            label="ID Last Link (opcional)"
            name="externalId"
            fullWidth
          />
          <TextInput
            control={control}
            label="ID Hubla (opcional)"
            name="hublaExternalId"
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
              {expertsList?.map((expert: Partial<ExpertList>) => (
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
              {isSubmitting ? "Criando..." : "Criar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
