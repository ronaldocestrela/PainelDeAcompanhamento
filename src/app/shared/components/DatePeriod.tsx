import StartPeriod from "./StartPeriod";
import EndPeriod from "./EndPeriod";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDashboard } from "./DashboardContext";

interface DatePeriodProps {
  iconOnly?: boolean;
}

export default function DatePeriod({ iconOnly = false }: DatePeriodProps) {
  const { startDate, setStartDate, endDate, setEndDate } = useDashboard();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={
        iconOnly
          ? {}
          : {
              bgcolor: "action.hover",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            }
      }
    >
      <StartPeriod
        value={startDate}
        onChange={setStartDate}
        iconOnly={iconOnly}
      />
      {!iconOnly && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ userSelect: "none" }}
        >
          —
        </Typography>
      )}
      <EndPeriod value={endDate} onChange={setEndDate} iconOnly={iconOnly} />
    </Stack>
  );
}
