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
  Alert,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(null);
  const [sortField, setSortField] = useState("count");
  const [sortDirection, setSortDirection] = useState("z-a");
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
        <Stack alignContent="center" spacing={2} sx={{ margin: "40% auto" }}>
          <p>Loading...</p> <CircularProgress color="secondary" />
        </Stack>
      ) : error ? (
        <Alert variant="outlined" severity="error" sx={{ margin: "40% auto" }}>
          {error}
        </Alert>
      ) : (
        <>
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
                <MenuItem value={10} sx={{fontSize: "14px"}}>10</MenuItem>
                <MenuItem value={20} sx={{fontSize: "14px"}}>20</MenuItem>
                <MenuItem value={50} sx={{fontSize: "14px"}}>50</MenuItem>
                <MenuItem value={100} sx={{fontSize: "14px"}}>100</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{paddingLeft:'6px'}}>
                    {sortDirection === "a-z" ? (
                      <Button 
                        onClick={() => {
                          setSortDirection("z-a");
                          setSortField("name");
                        }}
                      >
                        Name {sortField === "count" ? "" : <ArrowUpwardIcon />}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          setSortDirection("a-z");
                          setSortField("name");
                        }}
                      >
                        Name{" "}
                        {sortField === "count" ? "" : <ArrowDownwardIcon />}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{paddingRight:'6px'}}>
                    {sortDirection === "a-z" ? (
                      <Button
                        onClick={() => {
                          setSortDirection("z-a");
                          setSortField("count");
                        }}
                      >
                        {sortField === "name" ? "" : <ArrowUpwardIcon />} Count
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          setSortDirection("a-z");
                          setSortField("count");
                        }}
                      >
                        
                        {sortField === "name" ? "" : <ArrowDownwardIcon />} Count
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow key={tag.name}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell align="right">{tag.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{ marginTop: "15px", maxWidth: "370px" }}
            count={Math.ceil(total / itemsPerPage)}
            color="primary"
            onChange={(event, newPage) => {
              setCurrentPage(newPage);
            }}
          />
        </>
      )}
    </Stack>
  );
}
