import React, { useState } from "react";
import { Typography, ListItemText, List, ListItem } from "@mui/material";
function Logicaltask() {
    const [data] = useState(['toy', 'shop', 'toy', 'cake', 'pastry', 'shop']);

    const counts = {};
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      counts[item] = counts[item] ? counts[item] + 1 : 1;
    }
  
    const elements = [];
    for (let key in counts) {
      if (counts.hasOwnProperty(key)) {
        elements.push(
          <ListItem key={key}>
            <ListItemText primary={`${key} = ${counts[key]}`} />
          </ListItem>
        );
      }
    }
  
    elements.push(
      <ListItem key="shop-final">
        <ListItemText primary={`shop = ${counts['shop'] - 1}`} />
      </ListItem>
    );
  return (
    <>
      <Typography variant="h6">Output</Typography>
      <List>{elements}</List>
    </>
  );
}

export default Logicaltask;
