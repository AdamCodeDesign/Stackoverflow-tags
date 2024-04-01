import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Pagination,
  Stack,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(null);
  const [sortField, setSortField] = useState("count");
  const [sortDirection, setSortDirection] = useState("z-a");
  const [nameIconDisable, setNameIconDisable] = useState(false);
  const [countIconDisable, setCountIconDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `https://api.stackexchange.com/2.3/tags?&pagesize=${itemsPerPage}&page=${currentPage}&order=desc&sort=popular&site=stackoverflow&filter=!nNPvSNVZJS&key=6MoiMCbLqBVyBAt7GsOikA((
            `
        );
        setTags(response.data.items);
        setTotal(response.data.total);
        console.log("data", response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTags();
  }, [itemsPerPage, currentPage]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  tags.sort((a, b) => {
    const compareValue = sortDirection === "a-z" ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  return (
    <Stack p={1}>
      {loading ? (
        <Stack alignContent="center" spacing={2} sx={{margin: '40% auto'}}>
          <p>Loading...</p> <CircularProgress color="secondary" />
        </Stack>
      ) : error ? (
        <Alert variant="outlined" severity="error" sx={{margin: '40% auto'}}>
          {error}
        </Alert>
      ) : (
        <>
          <Grid container>
            <Grid item>
              <TextField
                size="small"
                value={itemsPerPage}
                select
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  fontSize: "1em",
                  borderRadius: "6px",
                }}
                onChange={handleItemsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name{" "}
                    {sortDirection === "a-z" ? (
                      <Button
                        onClick={() => {
                          setSortDirection("z-a");
                          setSortField("name");
                          setCountIconDisable(true);
                          setNameIconDisable(false);
                        }}
                      >
                        {nameIconDisable ? (
                          <FiberManualRecordIcon fontSize="" />
                        ) : (
                          <ArrowUpwardIcon />
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setSortDirection("a-z");
                          setSortField("name");
                          setCountIconDisable(true);
                          setNameIconDisable(false);
                        }}
                      >
                        {nameIconDisable ? (
                          <FiberManualRecordIcon fontSize="" />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ paddingLeft: "50px" }}>
                    Count{" "}
                    {sortDirection === "a-z" ? (
                      <Button
                        onClick={() => {
                          setSortDirection("z-a");
                          setSortField("count");
                          setNameIconDisable(true);
                          setCountIconDisable(false);
                        }}
                      >
                        {countIconDisable ? (
                          <FiberManualRecordIcon fontSize="" />
                        ) : (
                          <ArrowUpwardIcon />
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setSortDirection("a-z");
                          setSortField("count");
                          setNameIconDisable(true);
                          setCountIconDisable(false);
                        }}
                      >
                        {countIconDisable ? (
                          <FiberManualRecordIcon fontSize="" />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow key={tag.name}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell align="center">{tag.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{ marginTop: "15px", maxWidth: "350px" }}
            count={Math.ceil(total / itemsPerPage)}
            color="primary"
            onChange={(event, newPage) => setCurrentPage(newPage)}
          />
        </>
      )}
    </Stack>
  );
}
