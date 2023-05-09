import React, { useState } from "react";
import moment from "moment-timezone";
import {
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function DateTask() {
  const [date, setDate] = useState(moment());
  const [timezone, setTimezone] = useState("UTC");

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const loadPreviousWeek = () => {
    setDate(date.clone().subtract(7, "days"));
  };

  const loadNextWeek = () => {
    setDate(date.clone().add(7, "days"));
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const startTime = moment().startOf("day").add(8, "hours");
  const endTime = moment().startOf("day").add(23, "hours");

  const times = [];

  let current = startTime.clone();
  while (current <= endTime) {
    times.push(current.format("h:mm A"));
    current.add(30, "minutes");
  }

  const convertToTimezone = (time) => {
    return moment(time, "h:mm A").tz(timezone).format("h:mm A");
  };

  return (
    <div>
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={loadPreviousWeek}>Previous Week</Button>
          <Typography variant="h5">
            {date.clone().tz(timezone).format("MMMM Do YYYY")}
          </Typography>
          <Button onClick={loadNextWeek}>Next Week</Button>
        </Box>
        <Box>
          <Typography variant="h6">Timesheet:</Typography>
          <FormControl
            sx={{ m: 1 }}
            variant="standard"
            id="timezone"
            value={timezone}
            onChange={handleTimezoneChange}
          >
            <InputLabel htmlFor="timezone-select">Timezone</InputLabel>
            <NativeSelect
              id="timezone-select"
              value={timezone}
              inputProps={{ "aria-label": "Timezone" }}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
            </NativeSelect>
          </FormControl>
        </Box>
        {daysOfWeek.map((day, index) => {
          const dayDate = date.clone().startOf("week").add(index, "days");
          return (
            <Box
              key={day}
              sx={{ display: "flex", border: "1px solid black", mt: 2 ,ml:1 }}
            >
              <Box sx={{ background: "silver", width: "10%" ,textAlign:"center" ,fontSize:"20px" }}>
                <Typography sx={{ color: "red", width: "90%" ,mt:2 }}>
                  {day}
                </Typography>
                <Typography>{dayDate.format("M/D")}</Typography>
              </Box>
              <Box>
                {times.map((time) => {
                  const convertedTime = convertToTimezone(time);
                  return (
                    <FormControlLabel
                      key={time}
                      control={<Checkbox sx={{ color: "rgb(0, 121, 244);" }} />}
                      label={convertedTime}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </>
    </div>
  );
}

export default DateTask;
