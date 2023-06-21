import React from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ icon, attended, total, percentage, legend, unit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {`${attended} / ${total} ${unit}`}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={percentage / 100} size="40" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[400] }}>
          {legend}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[400] }}
        >
          {`${percentage} %`}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
