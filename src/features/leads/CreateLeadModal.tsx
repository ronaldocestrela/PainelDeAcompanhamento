import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import {
  createLeadSchema,
  type CreateLeadSchema,
} from "../../lib/schemas/createLeadSchema";
import { useExperts } from "../../lib/hooks/useExperts";
import { useAnalystic } from "../../lib/hooks/useAnalystic";

interface CreateLeadModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateLeadSchema) => Promise<void>;
  isSubmitting: boolean;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateLeadModal({
  open,
  onClose,
  onCreate,
  isSubmitting,
}: CreateLeadModalProps) {
  const { projects: experts } = useExperts();
  const { analystics: analysts } = useAnalystic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLeadSchema>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      analystId: "",
      date: "",
      registerCounts: 0,
      baseLeads: 0,
      expertId: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const processSubmit: SubmitHandler<CreateLeadSchema> = async (data) => {
    console.log("Payload enviado para criação de lead:", data);
    await onCreate(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-lead-modal-title"
      aria-describedby="create-lead-modal-description"
    >
      <Box
        sx={modalStyle}
        component="form"
        onSubmit={handleSubmit(processSubmit)}
      >
        <Typography
          id="create-lead-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Criar Novo Lead
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Data"
            variant="outlined"
            fullWidth
            required
            type="date"
            {...register("date")}
            error={!!errors.date}
            helperText={errors.date?.message}
            disabled={isSubmitting}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Registros"
            variant="outlined"
            fullWidth
            required
            type="number"
            {...register("registerCounts", { valueAsNumber: true })}
            error={!!errors.registerCounts}
            helperText={errors.registerCounts?.message}
            disabled={isSubmitting}
          />
          <TextField
            label="Base Leads"
            variant="outlined"
            fullWidth
            required
            type="number"
            {...register("baseLeads", { valueAsNumber: true })}
            error={!!errors.baseLeads}
            helperText={errors.baseLeads?.message}
            disabled={isSubmitting}
          />
          <TextField
            select
            variant="outlined"
            fullWidth
            required
            {...register("analystId")}
            error={!!errors.analystId}
            helperText={errors.analystId?.message}
            disabled={isSubmitting}
            SelectProps={{ native: true }}
          >
            <option value="">Selecione um analista</option>
            {analysts?.map((analyst: any) => (
              <option key={analyst.id} value={analyst.id}>
                {analyst.name}
              </option>
            ))}
          </TextField>
          <TextField
            select
            variant="outlined"
            fullWidth
            required
            {...register("expertId")}
            error={!!errors.expertId}
            helperText={errors.expertId?.message}
            disabled={isSubmitting}
            SelectProps={{ native: true }}
          >
            <option value="">Selecione um expert</option>
            {experts?.map((expert: any) => (
              <option key={expert.id} value={expert.id}>
                {expert.name}
              </option>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
            >
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
