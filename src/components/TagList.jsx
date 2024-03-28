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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("a-z");
  const [nameIconDisable, setNameIconDisable] = useState(false);
  const [countIconDisable, setCountIconDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = itemsPerPage;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "https://api.stackexchange.com/2.3/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow"
        );
        setTags(response.data.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const sortedTags = tags.sort((a, b) => {
    const compareValue = sortDirection === "a-z" ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const visibleTags = sortedTags.slice(startIndex, startIndex + pageSize);

  return (
    <Stack p={1}>
      <Grid container>
        <Grid item >
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
            <MenuItem value={tags.length}>all</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
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
                  <TableCell align="center" sx={{paddingLeft:'50px'}}>
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
                {visibleTags.map((tag) => (
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
            count={tags.length / pageSize}
            color="primary"
            onChange={(event, newPage) => setCurrentPage(newPage)}
          />
        </>
      )}
    </Stack>
  );
}
