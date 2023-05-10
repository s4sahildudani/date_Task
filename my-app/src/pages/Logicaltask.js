import React, { useState } from "react";
import { Typography, ListItemText, List, ListItem } from "@mui/material";
function Logicaltask() {
  const [data] = useState(['toy', 'shop', 'toy', 'cake', 'pastry', 'shop']);
  const counts = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    console.log("item",item);
    counts[item] = counts[item] ? counts[item] + 1 : 1;
  }
  const elements = Object.keys(counts).map((key) => (
    <ListItem key={key}>
      <ListItemText primary={`${key} = ${counts[key]}`} />
    </ListItem>
  ));

  const data4 = ["test", "tester", "", "testy", null];
  const filteredData = data4.filter(value => value);
  return (
    <>
      <Typography variant="h6">Output</Typography>
      <List>{elements}</List>
      <p>data = {JSON.stringify(filteredData)}</p>
    </>
  );
}
export default Logicaltask;