import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Stack alignContent="center" spacing={2} sx={{ margin: "40% auto" }}>
      <p>Loading...</p> <CircularProgress color="secondary" />
    </Stack>
  );
}
