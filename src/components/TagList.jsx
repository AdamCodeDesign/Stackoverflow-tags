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
  IconButton,
  Button,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
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

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const sortedTags = tags.sort((a, b) => {
    const compareValue = sortDirection === "asc" ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });

  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.value, 10));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const visibleTags = tags.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <FormControl>
        <InputLabel>Items per page</InputLabel>
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortField} onChange={handleSortFieldChange}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="count">Count</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort direction</InputLabel>
        <Select value={sortDirection} onChange={handleSortDirectionChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleTags.map((tag) => (
                  <TableRow key={tag.name}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell>{tag.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              justifyContent: "space-evenly",
              margin: "0 auto",
            }}
          >
            <Button
            // variant="text"
              color="primary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <NavigateBeforeIcon />
            </Button>
            <Select value={currentPage} onChange={handlePageChange} >
              {Array.from(
                { length: Math.ceil(tags.length / pageSize) },
                (_, i) => (
                  <MenuItem key={i + 1} value={i + 1} color="primary">
                    Page {i + 1}
                  </MenuItem>
                )
              )}
            </Select>
            <IconButton
              color="primary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={startIndex + pageSize >= sortedTags.length}
            >
              <NavigateNextIcon />
            </IconButton>
          </FormControl>
          
        </>
      )}
    </div>
  );
}
