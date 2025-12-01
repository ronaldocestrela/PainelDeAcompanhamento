import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { ListLeads } from "../../lib/types";


interface LeadCardProps {
  lead: ListLeads;
  onEdit: (lead: ListLeads) => void;
}

export default function LeadCard({ lead, onEdit }: LeadCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {lead.analystId}
          </Typography>
          <IconButton aria-label="editar lead" onClick={() => onEdit(lead)} size="small" sx={{ p: 0.5 }}>
            <EditIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
        </Box>
      </CardContent>
    </Card>
  );
}
