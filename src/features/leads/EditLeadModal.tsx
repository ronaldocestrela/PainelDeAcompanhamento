import { useEffect } from "react";
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
import type { ListLeads } from "../../lib/types";

interface EditLeadModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: CreateLeadSchema) => Promise<void>;
  isSubmitting: boolean;
  leadToEdit: ListLeads | null;
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

export default function EditLeadModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  leadToEdit,
}: EditLeadModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLeadSchema>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      date: "",
      registerCounts: 0,
      baseLeads: 0,
      expertId: "",
      analystId: "",
    },
  });

  useEffect(() => {
    if (open && leadToEdit) {
      reset({
        date: leadToEdit.date ? leadToEdit.date.split("T")[0] : "",
        registerCounts: leadToEdit.registerCounts,
        baseLeads: leadToEdit.baseLeads,
        expertId: leadToEdit.expertId ?? "",
        analystId: leadToEdit.analystId ?? "",
      });
    } else if (!open) {
      reset({
        date: "",
        registerCounts: 0,
        baseLeads: 0,
        expertId: "",
        analystId: "",
      });
    }
  }, [open, leadToEdit, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const processSubmit: SubmitHandler<CreateLeadSchema> = async (data) => {
    await onUpdate(leadToEdit?.id || "", data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-lead-modal-title"
      aria-describedby="edit-lead-modal-description"
    >
      <Box
        sx={modalStyle}
        component="form"
        onSubmit={handleSubmit(processSubmit)}
      >
        <Typography
          id="edit-lead-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Lead
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
            label="Expert ID"
            variant="outlined"
            fullWidth
            required
            {...register("expertId")}
            error={!!errors.expertId}
            helperText={errors.expertId?.message}
            disabled={isSubmitting}
          />
          <TextField
            label="Analyst ID"
            variant="outlined"
            fullWidth
            required
            {...register("analystId")}
            error={!!errors.analystId}
            helperText={errors.analystId?.message}
            disabled={isSubmitting}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
