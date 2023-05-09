import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Grid,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  styled,
  InputBase,
} from "@mui/material";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
function DateTask() {
  const [date, setDate] = useState(moment().utcOffset(0));
  const [timezone, setTimezone] = useState("UTC");
  const [workingDays, setWorkingDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
  });
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function loadPreviousWeek() {
    const previousWeekDate = date.clone().subtract(1, "week");
    setDate(previousWeekDate);
  }

  function loadNextWeek() {
    const nextWeekDate = date.clone().add(1, "week");
    setDate(nextWeekDate);
  }

  function handleTimezoneChange(event) {
    const newTimezone = event.target.value;
    setTimezone(newTimezone);
  }

  function handleWorkingDayChange(event) {
    const day = event.target.name;
    const checked = event.target.checked;
    setWorkingDays((prevDays) => ({
      ...prevDays,
      [day]: checked,
    }));
  }

  useEffect(() => {
    const timezoneDate = date.tz(timezone);
    setDate(timezoneDate);
  }, [date, timezone]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [];
  let time = moment("08:00", "HH:mm");
  while (time.isBefore(moment("23:00", "HH:mm"))) {
    timeSlots.push(time.format("HH:mm"));
    time.add(30, "minutes");
  }
  return (
    <div>
      <div style={{ marginLeft: "5%" }}>
        <h1>{date.clone().tz(timezone).format(" MMMM Do YYYY")}</h1>

        <button onClick={loadPreviousWeek}>Previous Week</button>
        <button onClick={loadNextWeek}>Next Week</button>
      </div>
      <div>
        <label htmlFor="timezone">Select Timezone:</label>
        <select id="timezone" value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
      <div>
        {weekDays.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              name={day}
              checked={workingDays[day]}
              onChange={handleWorkingDayChange}
            />
            {day}
          </label>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {weekDays
              .filter((day) => workingDays[day])
              .map((day) => (
                <th key={day}>{date.clone().day(day).format("ddd, D MMM")}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {weekDays
                .filter((day) => workingDays[day])
                .map((day) => (
                  <td key={day}>
                    {date.clone().day(day).format("DD/MM/YYYY")} {time}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>UI</h3>

      <Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={loadPreviousWeek}>Previous Button</Button>
          <Typography variant="h5">
            {date.clone().tz(timezone).format(" MMMM Do YYYY")}
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
            <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={age}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Grid>
    </div>
  );
}

export default DateTask;
