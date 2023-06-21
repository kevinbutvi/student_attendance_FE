import React, { useState } from "react";
import { useQuery } from "react-query";

import { Box, Button, Typography, useTheme } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";

import MyErrorMessage from "../../components/MyErrorMessage";
import MyLoader from "../../components/MyLoader";
import Header from "../../components/Header";
import CalendarChart from "../../components/CalendarChart";
import StatBox from "../../components/StatBox";
import CalendarSelector from "../../components/CalendarSelector";
import Spinner from "../../components/Spinner";
import MyModal from "../../components/MyModal";

import { dateFormatterForUI } from "../../utils/dateFormater";

import { getStudentSummaryById } from "../../services/studentServices";

import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const today = new Date();
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    // eslint-disable-next-line
    today.getDate()
  );
  const [dateError, setDateError] = useState();
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);

  const parameters = new URLSearchParams(window.location.search);
  const studentId = parameters.get("studentId");

  const handleClick = () => {
    if (startDate > endDate) {
      setDateError(true);
    } else {
      setDateError(false);
      refetch();
    }
  };

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    ["StudentSummary", studentId],
    // eslint-disable-next-line
    () => getStudentSummaryById(studentId, startDate, endDate)
  );

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: colors.blueAccent[700],
          }}
        >
          <CalendarSelector
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          ></CalendarSelector>
          <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
            {!isFetching && (
              <Button
                onClick={handleClick}
                variant="contained"
                startIcon={<SearchIcon fontSize="small" />}
                sx={{
                  width: "100%",
                  backgroundColor: colors.blueAccent[400],
                  m: 1,
                  p: 0.75,
                  "&:hover": {
                    color: colors.primary[700],
                    backgroundColor: colors.blueAccent[100],
                  },
                }}
              >
                Search
              </Button>
            )}
            {isFetching && <Spinner />}
          </Box>
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
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingX="5rem"
        >
          <StatBox
            attended={data.totalSummary.attendedHours}
            total={data.totalSummary.totalHours}
            percentage={data.totalSummary.attendedHoursPercentage}
            legend={`Attended Hours From ${dateFormatterForUI(startDate).slice(
              0,
              5
            )} to ${dateFormatterForUI(endDate)}.`}
            unit="Hours"
            icon={
              <ScheduleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingX="5rem"
        >
          <StatBox
            attended={data.totalSummary.attendedClasses}
            total={data.totalSummary.totalClasses}
            percentage={data.totalSummary.totalClassesPercentage}
            legend={`Passed Classes from ${dateFormatterForUI(startDate).slice(
              0,
              5
            )} to ${dateFormatterForUI(endDate)}`}
            unit="Classes"
            icon={
              <PlaylistAddCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          height="55vh"
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
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
            {/* eslint-disable-next-line multiline-ternary */}
            {data.summary === null ? (
              <MyModal
                title="Date Input Error"
                description="There are no Data between those Dates"
              />
            ) : (
              <CalendarChart summary={data.summary} />
            )}
          </Box>
        </Box>
      </Box>
      {dateError && (
        <MyModal
          title="Date Input Error"
          description="END Date must be greater or Equal than START Date"
        />
      )}
    </Box>
  );
};

export default Dashboard;
