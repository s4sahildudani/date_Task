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
  console.log(date);
  const [timezone, setTimezone] = useState("UTC");
  const [selectedDay, setSelectedDay] = useState("");
  
  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const loadPreviousWeek = () => {
    setDate(date.clone().subtract(7, "days"));
    setSelectedDay("");
  };

  const loadNextWeek = () => {
    setDate(date.clone().add(7, "days"));
    setSelectedDay("");
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const today = moment().startOf("day");
  const daysFromToday = date.diff(today, "days");
  const isTodayOrAfter = daysFromToday >= 0 && daysFromToday < 5;

  const startTime = moment().startOf("day").add(8, "hours");
  const endTime = moment().startOf("day").add(23, "hours");
console.log("endtime",endTime);
console.log("startTime",endTime)
  const times = [];

  let current = startTime.clone();

  while (current <= endTime && current.day() <= 5) {
    times.push(current.format("h:mm A"));
    current.add(30, "minutes");
  }
  
  

  const convertToTimezone = (time) => {
    const datetime = moment.tz(
      `${date.format("YYYY-MM-DD")} ${time}`,
      "YYYY-MM-DD h:mm A",
      "UTC"
    );
    const converted = datetime.clone().tz(timezone);
    return converted.format("h:mm A");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={loadPreviousWeek}>Previous Week</Button>
        <Typography variant="h5">{date.format("MMMM Do YYYY")}</Typography>

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
  const isWeekday = index >= 0 && index <= 4;
  const isSelected = selectedDay === day;

  // Check if the day is today or a future day
  const isTodayOrFuture = dayDate.isSameOrAfter(moment().startOf("day"));

  console.log("istoday",isTodayOrAfter);
  return (
    <Box
      key={`${day}-${dayDate.format("M/D")}`}
      sx={{
        display: "flex",
        border: "1px solid black",
        mt: 2,
        ml: 1,
        background: isSelected ? "#eee" : "none",
      }}
      onClick={() => setSelectedDay(day)}
    >
      <Box
        sx={{
          background: "silver",
          width: "15%",
          textAlign: "center",
          fontSize: "20px",
          color: isSelected ? "blue" : "inherit",
        }}
      >
        <Typography sx={{ color: "red", width: "85%", mt: 2 }}>
          {day}
        </Typography>
        <Typography>{dayDate.format("M/D")}</Typography>
      </Box>
      {isWeekday && isTodayOrFuture && (
        <Box>
          {times.map((time) => {
            return (
              <FormControlLabel
                key={`${day}-${time}`}
                control={<Checkbox checked={false} />}
                label={convertToTimezone(time)}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
})}



    </>
  );
}

export default DateTask;
