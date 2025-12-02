import { useState } from "react";
import StartPeriod from "./StartPeriod";
import EndPeriod from "./EndPeriod";
import Stack from "@mui/material/Stack";
import { useDashboard } from "./DashboardContext";

interface DatePeriodProps {
  iconOnly?: boolean;
}

export default function DatePeriod({ iconOnly = false }: DatePeriodProps) {
  const { startDate, setStartDate, endDate, setEndDate } = useDashboard();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StartPeriod value={startDate} onChange={setStartDate} iconOnly={iconOnly} />

      <EndPeriod value={endDate} onChange={setEndDate} iconOnly={iconOnly} />
    </Stack>
  );
}
