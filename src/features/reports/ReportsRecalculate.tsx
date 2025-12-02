import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Modal,
  Stack,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recalculateReportsSchema, type RecalculateReportsSchema } from "../../lib/schemas/reportsSchema";
import { useHouses } from "../../lib/hooks/useHouses";
import { useReports } from "../../lib/hooks/useReports";
import type { ListBookmakers } from "../../lib/types";

const modalStyle = {
  position: "absolute",
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

export default function ReportsRecalculate() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [formData, setFormData] = useState<RecalculateReportsSchema | null>(null);

  const { houses, isLoadingHouses } = useHouses();
  const { recalculateReports } = useReports();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecalculateReportsSchema>({
    resolver: zodResolver(recalculateReportsSchema),
  });

  const onSubmit = (data: RecalculateReportsSchema) => {
    setFormData(data);
    setOpenConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;
    try {
      await recalculateReports.mutateAsync({
        bookmakerId: formData.bookmakerId,
        StartDate: formData.startDate,
        EndDate: formData.endDate,
      });
      setOpenConfirmModal(false);
      // Talvez mostrar sucesso ou redirecionar
    } catch (error) {
      console.error("Erro ao recalcular relatórios:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenConfirmModal(false);
    setFormData(null);
  };

  if (isLoadingHouses) {
    return <Typography>Carregando casas de apostas...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recalcular Relatórios
      </Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="bookmakerId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Casa de Apostas"
              fullWidth
              error={!!errors.bookmakerId}
              helperText={errors.bookmakerId?.message}
            >
              {houses?.map((house: ListBookmakers) => (
                <MenuItem key={house.id} value={house.id}>
                  {house.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Data Inicial"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Data Final"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth>
          Enviar
        </Button>
      </Stack>

      <Modal open={openConfirmModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Confirmar Recálculo
          </Typography>
          {formData && (
            <Stack spacing={1}>
              <Typography>
                <strong>Casa de Apostas:</strong>{" "}
                {houses?.find((h) => h.id === formData.bookmakerId)?.name}
              </Typography>
              <Typography>
                <strong>Data Inicial:</strong> {formData.startDate}
              </Typography>
              <Typography>
                <strong>Data Final:</strong> {formData.endDate}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={recalculateReports.isPending}
            >
              {recalculateReports.isPending ? "Enviando..." : "Confirmar"}
            </Button>
          </Stack>
          {recalculateReports.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Erro ao recalcular relatórios.
            </Alert>
          )}
        </Box>
      </Modal>
    </Box>
  );
}