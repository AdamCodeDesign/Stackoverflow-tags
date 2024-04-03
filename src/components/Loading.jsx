import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack alignContent="center" spacing={2} sx={{ margin: "40% auto" }} className="loading">
      <p>Loading...</p> <CircularProgress color="secondary" />
    </Stack>
  );
}
