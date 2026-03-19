import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/material/Box";
import IconButton, { type IconButtonOwnProps } from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";

export default function ColorModeIconDropdown(props: IconButtonOwnProps) {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: "bottom",
          display: "inline-flex",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: "1px solid",
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      data-screenshot="toggle-mode"
      onClick={toggleMode}
      disableRipple
      size="small"
      aria-label="Alternar tema"
      {...props}
    >
      {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
