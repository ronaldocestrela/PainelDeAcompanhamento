import { useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useUser } from "../../lib/hooks/useUser";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRole } from "../../lib/hooks/useRole";
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

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser } = useAccount();
  const { refetchUsers } = useUser();
  const handleCreateUser = async (data: any) => {
    setIsSubmitting(true);
    try {
      const selectedRole = roles?.find((role) => role.id === data.role);
      const payload = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        isActive: true,
        isSaler: selectedRole?.name === "Saler",
        isAnalyst: selectedRole?.name === "Analyst",
        roleUser: data.role || "",
        imageUrl: data.imageUrl || null,
      };
      console.log("Payload enviado para registerUser:", payload);
      if (!payload.roleUser) {
        alert("Selecione um papel para o usuário.");
        setIsSubmitting(false);
        return;
      }
      await registerUser.mutateAsync(payload);
      await refetchUsers();
      handleCloseCreateModal();
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

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
        onCreate={handleCreateUser}
        isSubmitting={isSubmitting}
        roles={roles || []}
        isLoadingRoles={isLoadingRoles}
      />
    </>
  );
}
