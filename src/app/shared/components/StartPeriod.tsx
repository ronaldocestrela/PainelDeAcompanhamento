import { useState, useRef } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface StartPeriodProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  iconOnly?: boolean;
}

export default function StartPeriod({
  value,
  onChange,
  iconOnly = false,
}: StartPeriodProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) =>
          onChange(newValue ? dayjs(newValue).toDate() : null)
        }
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        slots={{
          field: () =>
            iconOnly ? (
              <Button
                variant="outlined"
                size="small"
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                sx={{
                  minWidth: "auto",
                  p: 1,
                }}
                aria-label={
                  value
                    ? `Start date: ${dayjs(value).format("DD/MM/YYYY")}`
                    : "Select start date"
                }
              >
                <DateRangeRoundedIcon fontSize="small" />
              </Button>
            ) : (
              <Button
                variant="text"
                size="small"
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                startIcon={<DateRangeRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  minWidth: "auto",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 1.5,
                  color: "text.primary",
                  "&:hover": { bgcolor: "action.selected" },
                }}
              >
                {value ? dayjs(value).format("DD/MM/YYYY") : "Selecione"}
              </Button>
            ),
        }}
        slotProps={{
          popper: {
            placement: "bottom-end",
            anchorEl: buttonRef.current,
            sx: iconOnly
              ? {}
              : {
                  position: "fixed",
                  top: "50px !important",
                  right: "180px !important",
                  left: "auto !important",
                  transform: "none !important",
                },
          },
        }}
        views={["day", "month", "year"]}
      />
    </LocalizationProvider>
  );
}
