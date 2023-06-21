import React, { useState } from "react";
import { useQuery } from "react-query";

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import Header from "../../components/Header";
import MyLoader from "../../components/MyLoader";
import StatusButton from "../../components/StatusButton";
import MyErrorMessage from "../../components/MyErrorMessage";
import CalendarSelector from "../../components/CalendarSelector";
import Spinner from "../../components/Spinner";
import MyModal from "../../components/MyModal";

import { tokens } from "../../theme";
import { getStudents } from "../../services/studentServices";

const StudentsList = () => {
  const today = new Date();
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const [dateError, setDateError] = useState();
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);
  const { data, error, refetch, isLoading, isFetching } = useQuery(
    ["StudentsList"],
    () => getStudents(startDate, endDate)
  );

  const handleClick = () => {
    if (startDate > endDate) {
      setDateError(true);
    } else {
      setDateError(false);
      refetch();
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isLoading) {
    return <MyLoader />;
  }

  if (error) {
    return <MyErrorMessage errorMessage={error} />;
  }

  if (data) {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 0.25,
      },
      {
        field: "dni",
        headerName: "Identification #",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "personName",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { id, personName } }) => {
          return (
            <Link
              href={`/dashboard/?studentId=${id}`}
              underline="none"
              color="inherit"
            >
              {personName}
            </Link>
          );
        },
      },
      {
        field: "attendancePercentage",
        headerName: "Attendance in Hs %",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1.5,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { status, id } }) => {
          return <StatusButton id={id} status={status} />;
        },
      },
    ];
    return (
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Header
            title="Students List"
            subtitle="List of Students Attendance to Python Classes"
          />
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
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        {dateError && (
          <MyModal
            title="Date Input Error"
            description="END Date must be greater or Equal than START Date"
          />
        )}
      </Box>
    );
  }
};

export default StudentsList;
