import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import ListPageLayoutMarketing from "./ListPageLayoutMarketing";
import CreateMarketingModal from "./CreateMarketingModal";
import MarketingTable from "./MarketingTable";

export default function MarketingDataContainer() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Criar nova ação de marketing"
      onClick={handleOpenCreateModal}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <>
      <ListPageLayoutMarketing
        title="Ações de Marketing"
        actionButton={addButton}
      >
        <MarketingTable />
      </ListPageLayoutMarketing>
      <CreateMarketingModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
      />
    </>
  );
}
