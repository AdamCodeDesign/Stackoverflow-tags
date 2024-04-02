import { Grid, MenuItem, TextField } from "@mui/material";
import React from "react";

export default function PagesizeSelect({ itemsPerPage, setItemsPerPage }) {
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };
  return (
    <Grid container>
      <Grid item>
        <TextField
          id="pagesize-select"
          size="small"
          value={itemsPerPage}
          select
          sx={{
            "& #pagesize-select": { fontSize: "14px" },
            width: "100%",
            bgcolor: "white",
            borderRadius: "6px",
          }}
          onChange={handleItemsPerPageChange}
        >
          <MenuItem value={10} sx={{ fontSize: "14px" }}>
            10
          </MenuItem>
          <MenuItem value={20} sx={{ fontSize: "14px" }}>
            20
          </MenuItem>
          <MenuItem value={50} sx={{ fontSize: "14px" }}>
            50
          </MenuItem>
          <MenuItem value={100} sx={{ fontSize: "14px" }}>
            100
          </MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}
