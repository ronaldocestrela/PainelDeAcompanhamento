import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  CircularProgress,
  Box,
} from "@mui/material";
import { useHouses } from "../../../lib/hooks/useHouses";
import { useDashboard } from "./DashboardContext";

export default function HouseFilter() {
  const { houses, isLoadingHouses } = useHouses();
  const { selectedBookmakerId, setSelectedBookmakerId } = useDashboard();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedBookmakerId(value === "" ? undefined : value);
  };

  if (isLoadingHouses) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <Select
        value={selectedBookmakerId ?? ""}
        onChange={handleChange}
        displayEmpty
        sx={{
          fontSize: "0.875rem",
          bgcolor: "action.hover",
          borderRadius: 2,
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
      >
        <MenuItem value="">Todas as casas</MenuItem>
        {houses?.map((house) => (
          <MenuItem key={house.id} value={house.id}>
            {house.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
