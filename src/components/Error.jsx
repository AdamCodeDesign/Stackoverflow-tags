import { Alert } from "@mui/material";

export default function Error({ error }) {
  return (
    <Alert variant="outlined" severity="error" sx={{ margin: "40% auto" }} className="alert">
      {error}
    </Alert>
  );
}
