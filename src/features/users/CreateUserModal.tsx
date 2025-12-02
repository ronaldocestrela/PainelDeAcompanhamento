import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { createUserSchema, type CreateUserSchema } from "../../lib/schemas/createUserSchema";
import { useUser } from "../../lib/hooks/useUser";
import type { CreateUserPayload } from "../../lib/types";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  roles: { id: string; name: string }[];
  isLoadingRoles: boolean;
  experts: { id: string; name: string }[];
  isLoadingExperts: boolean;
}

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

export default function CreateUserModal({
  open,
  onClose,
  roles,
  isLoadingRoles,
  experts,
  isLoadingExperts,
}: CreateUserModalProps) {
  const { createUser } = useUser();
  const { control, handleSubmit, reset } = useForm<CreateUserSchema>({
    mode: "onTouched",
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      expertId: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        expertId: "",
      });
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateUserSchema) => {
    try {
      const selectedRole = roles.find((role) => role.id === data.role);
      const payload: CreateUserPayload = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        isActive: true,
        isSaler: selectedRole?.name === "Saler",
        isAnalyst: selectedRole?.name === "Analyst",
        RoleUser: selectedRole?.name || data.role,
        expertId: data.expertId || undefined,
      };
      await createUser.mutateAsync(payload);
      onClose();
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  };

  const handleInternalClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleInternalClose}
      aria-labelledby="create-user-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="create-user-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Novo Usuário
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            autoFocus
            label="Nome"
            name="name"
            fullWidth
          />
          <TextInput
            control={control}
            label="Sobrenome"
            name="lastName"
            fullWidth
          />
          <TextInput
            control={control}
            label="Email"
            name="email"
            type="email"
            fullWidth
          />
          <TextInput
            control={control}
            label="Senha"
            name="password"
            type="password"
            fullWidth
          />
          <TextInput
            control={control}
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            fullWidth
          />
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label="Papel"
                fullWidth
                disabled={isLoadingRoles}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <MenuItem value="" disabled>
                  Selecione um papel
                </MenuItem>
                {isLoadingRoles ? (
                  <MenuItem value="" disabled>
                    Carregando papéis...
                  </MenuItem>
                ) : (
                  roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
          <Controller
            name="expertId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label="Expert (Opcional)"
                fullWidth
                disabled={isLoadingExperts}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {isLoadingExperts ? (
                  <MenuItem value="" disabled>
                    Carregando experts...
                  </MenuItem>
                ) : (
                  experts?.map((expert) => (
                    <MenuItem key={expert.id} value={expert.id}>
                      {expert.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button onClick={handleInternalClose} disabled={createUser.isPending}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={createUser.isPending}>
              {createUser.isPending ? "Criando..." : "Criar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
