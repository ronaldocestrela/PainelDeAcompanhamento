import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Box, Typography, FormControl } from "@mui/material";
import ListPageLayoutSales from "./ListPageLayoutSales";
import CreateSaleModal from "./CreateSaleModal";

import { useProducts } from "../../lib/hooks/useProducts";
import { useUser } from "../../lib/hooks/useUser";
import { useCreateSale } from "../../lib/hooks/useCreateSale";
import SalesTable from "./SalesTable";
import SalesLoading from "./SalesLoading";
import { useSales } from "../../lib/hooks/useSales";
import { useDashboard } from "../../app/shared/components/DashboardContext";

export default function SalesDataContainer() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { products = [], isLoadingProducts } = useProducts();
  const { users = [], isLoadingUsers } = useUser();
  const createSale = useCreateSale();
  const isSubmitting = createSale.isPending;
  const { getSalesByExpertId, allSales, totalValue, isLoadingAllSales } =
    useSales();

  const { selectedExpertId } = useDashboard();
  const { expertSales, expertTotalValue, isLoadingExpertSales } =
    getSalesByExpertId(selectedExpertId || undefined);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleCreateSale = async (form: any) => {
    const payload: any = {
      SaleDate: form.date
        ? new Date(form.date).toISOString()
        : new Date().toISOString(),
      Price: Number(form.price),
      ProductId: form.product,
    };
    if (form.seller) {
      payload.SellerId = form.seller;
    }
    await createSale.mutateAsync(payload);
    handleCloseCreateModal();
  };

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Criar nova venda"
      onClick={handleOpenCreateModal}
    >
      <AddIcon />
    </IconButton>
  );

  const isLoading = isLoadingAllSales || isLoadingExpertSales;
  const salesToShow = selectedExpertId ? expertSales : allSales;
  const totalToShow = selectedExpertId ? expertTotalValue : totalValue;

  return (
    <>
      <FormControl sx={{ minWidth: 220, mb: 2 }} size="small"></FormControl>
      <ListPageLayoutSales title="Vendas" actionButton={addButton}>
        {isLoading ? (
          <SalesLoading />
        ) : !salesToShow || salesToShow.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">Ainda não há vendas.</Typography>
            <Typography variant="body1">
              Clique no botão '+' para adicionar uma nova venda.
            </Typography>
          </Box>
        ) : (
          <SalesTable
            allSales={salesToShow}
            totalValue={totalToShow}
            isLoadingAllSales={isLoading}
          />
        )}
      </ListPageLayoutSales>
      <CreateSaleModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateSale}
        isSubmitting={isSubmitting}
        products={products}
        isLoadingProducts={isLoadingProducts}
        sellers={users.filter((u) => u.role === "Analyst")}
        isLoadingSellers={isLoadingUsers}
      />
    </>
  );
}
