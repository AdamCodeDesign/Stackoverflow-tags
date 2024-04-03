import { Alert } from "@mui/material";
import React from "react";

export default function Error({ error }) {
  return (
    <Alert variant="outlined" severity="error" sx={{ margin: "40% auto" }} className="alert">
      {error}
    </Alert>
  );
}
