
import React, { useState } from "react";
import { Typography, ListItemText, List, ListItem } from "@mui/material";

function Logicaltask() {
    const [data] = useState(['toy', 'shop', 'toy', 'cake', 'pastry', 'shop']);

    const counts = {};
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (counts[item]) {
        counts[item]++;
      } else {
        counts[item] = 1;
      }
    }
  
    const elements = [];
  
    // Display specific lines
    if (counts['toy']) {
      elements.push(
        <ListItem key="toy">
          <ListItemText primary={`toy = ${counts['toy']}`} />
        </ListItem>
      );
    }
  
    if (counts['shop']) {
      elements.push(
        <ListItem key="shop">
          <ListItemText primary={`shop = ${counts['shop']}`} />
        </ListItem>
      );
    }
  
    if (counts['cake']) {
      elements.push(
        <ListItem key="cake">
          <ListItemText primary={`cake = ${counts['cake']}`} />
        </ListItem>
      );
    }
  
    if (counts['pastry']) {
      elements.push(
        <ListItem key="pastry">
          <ListItemText primary={`pastry = ${counts['pastry']}`} />
        </ListItem>
      );
    }

  return (
    <>
      <Typography variant="h6">Output</Typography>
      <List>{elements}</List>
    </>
  );
}

export default Logicaltask;
