import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (userData: any) => Promise<void>;
  isSubmitting: boolean;
  roles: { id: string; name: string }[];
  isLoadingRoles: boolean;
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
  onCreate,
  isSubmitting,
  roles,
  isLoadingRoles,
}: CreateUserModalProps) {
  const { control, handleSubmit, reset } = useForm<any>({
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: any) => {
    try {
      await onCreate(data);
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
          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Papel"
                fullWidth
                disabled={isLoadingRoles}
                error={!field.value}
                helperText={!field.value ? "Selecione um papel" : ""}
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
