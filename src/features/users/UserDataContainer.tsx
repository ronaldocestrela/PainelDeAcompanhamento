import { useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useUser } from "../../lib/hooks/useUser";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRole } from "../../lib/hooks/useRole";
import { useExperts } from "../../lib/hooks/useExperts";
import CreateUserModal from "./CreateUserModal";
import ListPageLayoutUser from "./ListPageLayoutUser";
import UserTable from "./UserTable";

interface ExpertDataContainerProps {
  pageTitle: string;
}

export default function UserDataContainer({
  pageTitle,
}: ExpertDataContainerProps) {
  const { roles, isLoadingRoles } = useRole();
  const { projects: experts, isLoading: isLoadingExperts } = useExperts();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const addButton = (
    <IconButton
      color="primary"
      aria-label="Criar novo usuário"
      onClick={handleOpenCreateModal}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <>
      <ListPageLayoutUser title={pageTitle} actionButton={addButton}>
        <UserTable onEdit={() => {}} />
      </ListPageLayoutUser>
      <CreateUserModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        roles={roles || []}
        isLoadingRoles={isLoadingRoles}
        experts={experts?.map(expert => ({ id: expert.id, name: expert.name })) || []}
        isLoadingExperts={isLoadingExperts}
      />
    </>
  );
}
