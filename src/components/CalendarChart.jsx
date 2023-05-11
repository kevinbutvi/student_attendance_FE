import React from "react";

import { ResponsiveCalendar } from "@nivo/calendar";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const CalendarChart = ({ summary }) => {
  const theme = useTheme();
  const myColors = tokens(theme.palette.mode);

  return (
    <ResponsiveCalendar
      data={summary}
      from={summary[0].day}
      to={summary[0].day}
      emptyColor="#c2c2c2"
      colors={["#db4f4a", "#b7ebde", "#70d8bd"]}
      margin={{ top: 20, right: 20, bottom: 100, left: 40 }}
      theme={{
        background: theme.background,
        textColor: myColors.primary[100],
        fontSize: 24,
        legends: {
          title: {
            text: {
              fontSize: 14,
              fill: myColors.primary[100],
            },
          },
          text: {
            fontSize: 12,
            fill: myColors.primary[100],
          },
          ticks: {
            line: {},
            text: {
              fontSize: 10,
              fill: myColors.primary[100],
            },
          },
        },
        tooltip: {
          container: {
            background: theme.background,
            color: myColors.primary[800],
            fontSize: 12,
          },
        },
      }}
      yearSpacing={40}
      monthSpacing={5}
      monthLegendPosition="after"
      monthLegendOffset={30}
      monthBorderColor={myColors.primary[500]}
      dayBorderWidth={2}
      //! MIN VALUE
      minValue={70}
      //! MAX VALUE
      maxValue={100}
      dayBorderColor={myColors.primary[600]}
      legends={[
        {
          textColor: myColors.primary[600],
          anchor: "bottom-right",
          direction: "row",
          translateY: -50,
          translateX: -50,
          itemCount: 3,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export default CalendarChart;
