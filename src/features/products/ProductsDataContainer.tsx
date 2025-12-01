import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import CreateProductsModal from "./CreateProductsModal";
import ProductsTable from "./ProductsTable";
import ListPageLayoutProducts from "./ListPageLayoutProducts";
import EditProductsModal from "./EditProductsModal";
import type { Product, ProductCreate } from "../../lib/types";
import { useProducts } from "../../lib/hooks/useProducts";

export default function ProductsDataContainer() {
  const { products, isLoadingProducts, createProduct, updateProduct } =
    useProducts();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedProduct(null);
  };

  const handleCreateProduct = async (productData: ProductCreate) => {
    try {
      await createProduct.mutateAsync(productData);
      handleCloseCreateModal();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleUpdateProduct = async (
    id: string,
    data: { name: string; externalId: string; expertId: string }
  ) => {
    try {
      await updateProduct.mutateAsync({ id, ...data });
      handleCloseEditModal();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  if (isLoadingProducts) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Adicionar novo produto"
      onClick={handleOpenCreateModal}
      sx={{ marginLeft: "auto" }}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <>
      <ListPageLayoutProducts title="Produtos" actionButton={addButton}>
        {!products || products.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nenhum produto cadastrado
            </Typography>
            <Typography variant="body1">
              Clique no botão + para adicionar um novo produto
            </Typography>
          </Box>
        ) : (
          <ProductsTable products={products} onEdit={handleOpenEditModal} />
        )}
      </ListPageLayoutProducts>

      <CreateProductsModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateProduct}
        isSubmitting={createProduct.isPending}
      />
      {selectedProduct && (
        <EditProductsModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateProduct}
          isSubmitting={updateProduct.isPending}
          productToEdit={selectedProduct}
        />
      )}
    </>
  );
}
