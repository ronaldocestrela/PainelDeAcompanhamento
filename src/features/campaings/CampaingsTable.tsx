import { DataGrid, type GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Avatar, Typography, Stack} from "@mui/material";
import type { CampaingList } from "../../lib/types";
import EditIcon from "@mui/icons-material/Edit";

interface CampaingsTableProps {
  campaigns: CampaingList[] | undefined;
  onEdit: (campaign: CampaingList) => void;
}

const getInitials = (name?: string | null): string => {
  if (!name || typeof name !== "string" || name.trim() === "") return "";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColumns = (onEdit: (campaign: CampaingList) => void): GridColDef<CampaingList>[] => [
  {
    field: "name",
    headerName: "Nome da Campanha",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "expertName",
    headerName: "Expert",
    flex: 0.8,
    minWidth: 180,
    valueGetter: (value, row) => row.expertName || "",
    renderCell: (params) => {
      const name = params.row.expertName;
      const photoUrl = params.row.expertPhotoUrl;

      return (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Avatar
            src={photoUrl || undefined}
            alt={name || "Expert"}
            sx={{ width: 32, height: 32 }}
          >
            {!photoUrl && name ? getInitials(name) : null}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
            {name || (
              <Typography component="span" variant="caption">
                N/A
              </Typography>
            )}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: "analystName",
     headerName: "Analista",
    flex: 0.8,
    minWidth: 180,
    valueGetter: (value, row) => row.analystName || "",
    renderCell: (params) => {
      const name = params.row.analystName;
      const photoUrl = params.row.analystPhotoUrl;

      return (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Avatar
            src={photoUrl || undefined}
            alt={name || "Analista"}
            sx={{ width: 32, height: 32 }}
          >
            {!photoUrl && name ? getInitials(name) : null}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
            {name || (
              <Typography component="span" variant="caption">
                N/A
              </Typography>
            )}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: "totalReports",
    headerName: "Relatórios",
    width: 120,
    type: "number",
    renderCell: (params) => (
      <Typography variant="body2">{params.value}</Typography>
    ),
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Ações",
    width: 100,
    cellClassName: "actions",
    getActions: ({ row }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={() => onEdit(row)} 
          color="inherit"
        />,
      ];
    },
  },
];

export default function CampaingsTable({ campaigns, onEdit }: CampaingsTableProps) {
  if (!campaigns) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={campaigns}
        columns={getColumns(onEdit)} // Passar onEdit para getColumns
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}
