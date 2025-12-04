import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useUser } from "../../lib/hooks/useUser";

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "A senha deve conter pelo menos um número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type PasswordSchema = z.infer<typeof passwordSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function ChangePasswordModal({
  open,
  onClose,
  userId,
  userName,
}: ChangePasswordModalProps) {
  const { updatePassword } = useUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordSchema) => {
    try {
      await updatePassword.mutateAsync({
        UserId: userId,
        NewPassword: data.newPassword,
      });
      toast.success("Senha alterada com sucesso!");
      onClose();
      reset();
    } catch (error) {
      toast.error("Erro ao alterar senha. Tente novamente.");
      console.error("Erro ao alterar senha:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getPasswordStrengthColor = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, hasMinLength].filter(Boolean).length;

    if (score <= 2) return "error";
    if (score <= 4) return "warning";
    return "success";
  };

  const getPasswordStrengthText = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, hasMinLength].filter(Boolean).length;

    if (score <= 2) return "Senha fraca";
    if (score <= 4) return "Senha média";
    return "Senha forte";
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Alterar Senha
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Alterando senha para: <strong>{userName}</strong>
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Box>
                  <TextField
                    {...field}
                    type="password"
                    label="Nova Senha"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                  {field.value && (
                    <Alert 
                      severity={getPasswordStrengthColor(field.value)} 
                      sx={{ mt: 1 }}
                      variant="outlined"
                    >
                      {getPasswordStrengthText(field.value)}
                    </Alert>
                  )}
                </Box>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirmar Nova Senha"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Requisitos da senha:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 2, fontSize: "0.75rem", color: "text.secondary" }}>
                <li>Pelo menos 8 caracteres</li>
                <li>Pelo menos uma letra maiúscula (A-Z)</li>
                <li>Pelo menos uma letra minúscula (a-z)</li>
                <li>Pelo menos um número (0-9)</li>
                <li>Pelo menos um caractere especial (!@#$%^&*...)</li>
              </Box>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={handleClose}
                disabled={updatePassword.isPending}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updatePassword.isPending}
                fullWidth
              >
                {updatePassword.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}