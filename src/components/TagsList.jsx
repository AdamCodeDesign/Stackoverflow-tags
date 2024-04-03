import { useState, useEffect } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import PagesizeSelect from "./PagesizeSelect";
import TagsTable from "./TagsTable";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("popular");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `https://api.stackexchange.com/2.3/tags?&pagesize=${itemsPerPage}&page=${currentPage}&order=${sortDirection}&sort=${sortField}&site=stackoverflow&filter=!nNPvSNVZJS&key=6MoiMCbLqBVyBAt7GsOikA((
            `
        );
        setTags(response.data.items);
        setTotal(response.data.total);
        setLoading(true);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLoading(true);
      }
    };

    fetchTags();
  }, [itemsPerPage, currentPage, sortDirection, sortField]);

  return (
    <Stack p={1}>
      {!loading && <Loading />}
      {error ? (
        <Error error={error} />
      ) : (
        <Grid container>
          <PagesizeSelect
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <TagsTable
            tags={tags}
            sortField={sortField}
            setSortField={setSortField}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />{" "}
          <Pagination
            sx={{ marginTop: "15px", maxWidth: "370px" }}
            count={Math.ceil(total / itemsPerPage)}
            color="primary"
            page={currentPage}
            onChange={(event, newPage) => {
              setCurrentPage(newPage);
              setLoading(false);
              setError(null);
            }}
          />{" "}
        </Grid>
      )}
    </Stack>
  );
}
