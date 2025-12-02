import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import type { CampaingDetail, SelectOption } from "../../lib/types";
import type { CampaingList } from "../../lib/types"; 
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCampaingSchema,
  type UpdateCampaingSchema,
} from "../../lib/schemas/createCampaingSchema";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";

interface EditCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: UpdateCampaingSchema) => Promise<void>;
  isSubmitting: boolean;
  campaignToEdit: CampaingDetail | null; 
  campaignListItem?: CampaingList | null; 
  expertsList: SelectOption[] | undefined;
  analystsList: SelectOption[] | undefined;
}

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

export default function EditCampaignModal({
  open,
  onClose,
  onUpdate,
  isSubmitting,
  campaignToEdit,
  expertsList,
  analystsList,
  campaignListItem,
}: EditCampaignModalProps) {
  const {
    control,
    reset,
    handleSubmit,
    trigger,
  } = useForm<UpdateCampaingSchema>({
    mode: "onTouched",
    resolver: zodResolver(updateCampaingSchema),
    defaultValues: {
      Name: "",
      ExpertId: "",
      AnalystId: "",
      BookmakerId: "",
    },
  });

  
  const findIdByName = (list: SelectOption[] | undefined, name: string | undefined): string | undefined => {
    if (!list || !name) return undefined;
    return list.find(item => item.name === name)?.id;
  };

  useEffect(() => {
    if (open && campaignToEdit) {
      const valuesToReset = {
        Name: campaignToEdit.name,
        ExpertId: campaignToEdit.expertId || findIdByName(expertsList, campaignListItem?.expertName) || "",
        AnalystId: campaignToEdit.analystId || findIdByName(analystsList, campaignListItem?.analystName) || "",
        BookmakerId: campaignToEdit.bookMakerId || "", 
      };
    
      reset(valuesToReset);
   

      setTimeout(() => {
        void trigger();
       
      }, 0);
    } else if (!open) {
      reset({
        Name: "",
        ExpertId: "",
        AnalystId: "",
        BookmakerId: "",
      });
    }
  }, [open, campaignToEdit, campaignListItem, reset, trigger, expertsList, analystsList]); 

  const onSubmitHandle = async (data: UpdateCampaingSchema) => {
    if (!campaignToEdit) return;

    try {
      const bookMakerId = campaignToEdit.bookMakerId || (campaignToEdit.reports && campaignToEdit.reports.length > 0 ? campaignToEdit.reports[0].bookMakerId : null);
      const payload = {
        ...data,
        Name: campaignToEdit.name, // Garantir que o nome original seja enviado
        BookmakerId: bookMakerId, // Usar o bookMakerId da campanha ou do primeiro relatório
      };
      await onUpdate(campaignToEdit.id, payload);
    } catch (error) {
      console.error(
        "[EditCampaignModal] onSubmitHandle - Falha ao atualizar campanha:",
        error
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-campaign-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="edit-campaign-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Campanha
        </Typography>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <TextInput
            control={control}
            label="Nome da Campanha"
            name="Name"
            fullWidth
            disabled
          />
          <Controller
            control={control}
            name="ExpertId"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Expert"
                select
                fullWidth
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {expertsList?.map((expert) => (
                  <MenuItem key={expert.id} value={expert.id}>
                    {expert.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="AnalystId"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Analista"
                select
                fullWidth
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {analystsList?.map((analyst) => (
                  <MenuItem key={analyst.id} value={analyst.id}>
                    {analyst.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
