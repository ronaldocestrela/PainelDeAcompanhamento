import { useState } from "react";
import StartPeriod from "./StartPeriod";
import EndPeriod from "./EndPeriod";
import Stack from "@mui/material/Stack";

interface DatePeriodProps {
  iconOnly?: boolean;
}

export default function DatePeriod({ iconOnly = false }: DatePeriodProps) {
  const initialEndDate = new Date();

  const initialStartDate = new Date(initialEndDate);
  initialStartDate.setDate(initialEndDate.getDate() - 30);

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StartPeriod value={startDate} onChange={setStartDate} iconOnly={iconOnly} />

      <EndPeriod value={endDate} onChange={setEndDate} iconOnly={iconOnly} />
    </Stack>
  );
}
