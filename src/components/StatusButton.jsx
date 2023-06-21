import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";

import { tokens } from "../theme";

export default function StatusButton({ status }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      data-testid={`statusButtonText-${status}`}
      width="60%"
      m="0 auto"
      p="5px"
      display="flex"
      justifyContent="center"
      backgroundColor={
        status === 1 ? colors.greenAccent[700] : colors.redAccent[600]
      }
      borderRadius="4px"
    >
      <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
        {status === 1 && "PASSED"} {status === 0 && "FAILED"}
      </Typography>
    </Box>
  );
}
