import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextInput from "../../app/shared/components/TextInput";

interface SellerOption {
  id: string;
  name: string;
  lastName: string;
}

interface CreateSaleModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (saleData: CreateSaleForm) => Promise<void>;
  isSubmitting: boolean;
  products: { id: string; name: string }[];
  isLoadingProducts?: boolean;
  sellers: SellerOption[];
  isLoadingSellers?: boolean;
}

type CreateSaleForm = {
  date: string;
  price: string;
  product: string;
  seller?: string;
};

const modalStyle = {
  position: "absolute" as const,
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

export default function CreateSaleModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
  products,
  sellers = [],
  isLoadingSellers = false,
}: CreateSaleModalProps) {
  const { control, handleSubmit, reset, formState } = useForm<CreateSaleForm>({
    defaultValues: {
      date: "",
      price: "",
      product: "",
      seller: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateSaleForm) => {
    try {
      // Se seller for string vazia, remova do payload
      const payload = { ...data };
      if (!payload.seller) {
        delete payload.seller;
      }
      await onCreate(payload as CreateSaleForm);
    } catch (error) {
      console.error("Falha ao criar venda:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao criar venda. Tente novamente.";
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
      aria-labelledby="create-sale-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-sale-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Nova venda
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            name="date"
            label="Data"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!formState.errors?.date}
            helperText={formState.errors?.date?.message}
          />
          <TextInput
            control={control}
            name="price"
            label="Preço"
            type="text"
            fullWidth
            error={!!formState.errors?.price}
            helperText={formState.errors?.price?.message}
          />
          <TextInput
            control={control}
            name="product"
            label="Produto"
            select
            fullWidth
            error={!!formState.errors?.product}
            helperText={
              formState.errors?.product?.message || "Selecione um produto"
            }
            SelectProps={{ native: false }}
          >
            <MenuItem value="" disabled style={{ cursor: "pointer" }}>
              Selecione um produto
            </MenuItem>
            {products.map((product) => (
              <MenuItem
                key={product.id}
                value={product.id}
                style={{ cursor: "pointer" }}
              >
                {product.name}
              </MenuItem>
            ))}
          </TextInput>
          <TextInput
            control={control}
            name="seller"
            label="Vendedor"
            select
            fullWidth
            error={!!formState.errors?.seller}
            helperText={
              formState.errors?.seller?.message || "Selecione um vendedor"
            }
            SelectProps={{ native: false }}
          >
            {isLoadingSellers
              ? [
                  <MenuItem value="" disabled key="loading">
                    Carregando vendedores...
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    value=""
                    disabled
                    key="default"
                    style={{ cursor: "pointer" }}
                  >
                    Selecione um vendedor
                  </MenuItem>,
                  ...sellers.map((seller) => (
                    <MenuItem
                      key={seller.id}
                      value={seller.id}
                      style={{ cursor: "pointer" }}
                    >
                      {seller.name} {seller.lastName}
                    </MenuItem>
                  )),
                ]}
          </TextInput>
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
