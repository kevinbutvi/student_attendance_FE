import React from "react";
import { useQuery } from "react-query";

import { Box, Button, Typography, useTheme } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TimelineIcon from "@mui/icons-material/Timeline";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import MyErrorMessage from "../../components/MyErrorMessage";
import MyLoader from "../../components/MyLoader";
import Header from "../../components/Header";
import CalendarChart from "../../components/CalendarChart";
import StatBox from "../../components/StatBox";

import { getStudentSummaryById } from "../../services/studentServices";

import { tokens } from "../../theme";

const Dashboard = () => {
  const parameters = new URLSearchParams(window.location.search);
  const studentId = parameters.get("studentId");

  const { data, error, isLoading } = useQuery(
    ["StudentSummary", studentId],
    () => getStudentSummaryById(studentId)
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isLoading) {
    return <MyLoader />;
  }
  if (error) {
    return <MyErrorMessage errorMessage={error} />;
  }

  return (
    <Box m="20px 40px 20px 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={data.personName} subtitle="Classes Attendance History" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => window.print()}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download This Report
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="15vh"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            attended={data.thirtyDaysSummary.attendedHours}
            total={data.thirtyDaysSummary.totalHours}
            legend="Last 30 Days Hours Summary."
            unit="Hours"
            icon={
              <ScheduleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            attended={data.thirtyDaysSummary.attendedClasses}
            total={data.thirtyDaysSummary.totalClasses}
            legend="Last 30 Days Passed Classes."
            unit="Classes"
            icon={
              <EventAvailableIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            attended={data.yearSummary.attendedHours}
            total={data.yearSummary.totalHours}
            legend="Year Hours Summary"
            unit="Hours"
            icon={
              <TimelineIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            attended={data.yearSummary.attendedClasses}
            total={data.yearSummary.totalClasses}
            legend="Year Passed Classes"
            unit="Classes"
            icon={
              <PlaylistAddCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          height="60vh"
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Attended Classes in Percentage. {"( >= 80% to Pass)"}
              </Typography>
            </Box>
          </Box>
          <Box height="90%" m="0 0 0 0">
            <CalendarChart summary={data.summary} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
