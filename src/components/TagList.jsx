import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import Loading from "./Loading";
import Error from "./Error";
import PagesizeSelect from "./PagesizeSelect";
import TagsTable from "./TagsTable";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(null);
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

  return (
    <Stack p={1}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <PagesizeSelect
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />

          <TagsTable tags={tags} />
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
