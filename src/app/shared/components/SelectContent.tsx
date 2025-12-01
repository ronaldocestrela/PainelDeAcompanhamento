import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, {
  type SelectChangeEvent,
  selectClasses,
} from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded"; 
import { useExperts } from "../../../lib/hooks/useExperts";
import { Typography } from "@mui/material";
import { useAccount } from "../../../lib/hooks/useAccount";
import { useEffect } from "react"; 
import CreateExpertModal from "../../../features/experts/CreateExpertModal"; 
import type { ExpertCreate } from "../../../lib/types";
import { useDashboard } from "./DashboardContext";


const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const { selectedExpertId, setSelectedExpertId } = useDashboard();

  const { projects, isLoading, createExpert } = useExperts();
  const { currentUser } = useAccount();
  const [isLocalModalOpen, setIsLocalModalOpen] = React.useState(false);

  useEffect(() => {
    // Define o expert inicial quando os dados carregam e nenhum expert foi selecionado ainda
    if (!isLoading && projects && projects.length > 0 && !selectedExpertId) {
      setSelectedExpertId(projects[0].id);
    }
  }, [projects, isLoading, selectedExpertId, setSelectedExpertId]);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!projects) return <Typography>No projects found</Typography>;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (value !== 'add-expert-action') {
      setSelectedExpertId(value);
    }
  };

  const isAdmin = currentUser?.roleName?.toLowerCase() === "admin";

  const handleLocalCreateExpert = async (expertData: ExpertCreate) => {
    await createExpert.mutateAsync(expertData);
    setIsLocalModalOpen(false); 
  };

  return (
    <>
      <Select
        labelId="company-select"
        id="company-simple-select"
        value={selectedExpertId}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select company" }}
        fullWidth
        sx={{
          maxHeight: 56,
          width: 215,
          "&.MuiList-root": {
            p: "8px",
          },
          [`& .${selectClasses.select}`]: {
            display: "flex",
            alignItems: "center",
            gap: "2px",
            pl: 1,
          },
        }}
      >
        <ListSubheader sx={{ pt: 0 }}>Projetos</ListSubheader>
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            <ListItemAvatar>
              <Avatar alt={project.name}>
                <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.name} secondary="Projeto" />
          </MenuItem>
        ))}
       
        <Divider sx={{ mx: -1 }} />
        {isAdmin && (
          <MenuItem
            value="add-expert-action" 
            onClick={() => setIsLocalModalOpen(true)} 
          >
            <ListItemIcon>
              <AddRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Expert" />
          </MenuItem>
        )}
      </Select>
     
      {isAdmin && (
        <CreateExpertModal
          open={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
          onCreate={handleLocalCreateExpert}
          isSubmitting={createExpert.isPending} 
        />
      )}
    </>
  );
}
