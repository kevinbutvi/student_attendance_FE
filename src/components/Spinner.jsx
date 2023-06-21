import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function Spinner() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Stack
      data-testid="spinnerTest"
      sx={{ color: colors.blueAccent[200], height: "2rem", m: 2 }}
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
}
