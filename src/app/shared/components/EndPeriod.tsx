import { useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface EndPeriodProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  iconOnly?: boolean;
}

export default function EndPeriod({ value, onChange, iconOnly = false }: EndPeriodProps) {
  const [open, setOpen] = useState(false); 
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        slots={{
          field: (props) => (
            iconOnly ? (
              <Button
                variant="outlined"
                size="small"
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                sx={{
                  minWidth: 'auto',
                  p: 1,
                }}
                aria-label={value ? `End date: ${dayjs(value).format('DD/MM/YYYY')}` : "Select end date"}
              >
                <CalendarTodayRoundedIcon fontSize="small" />
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
                sx={{ minWidth: '120px' }}
              >
                {value ? dayjs(value).format('DD/MM/YYYY') : 'Selecione'}
              </Button>
            )
          )
        }}
        slotProps={{
          popper: {
            placement: 'bottom-end',
            anchorEl: buttonRef.current,
            sx: iconOnly ? {} : { 
                position: 'fixed',
                top: '50px !important', 
                right: '16px !important', 
                left: 'auto !important',
                transform: 'none !important',
              },
          },
        }}
        views={['day', 'month', 'year']}
      />
    </LocalizationProvider>
  );
}