import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function TagsTable({
  tags,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ paddingLeft: "6px" }}>
              {sortDirection === "asc" ? (
                <Button
                  onClick={() => {
                    setSortDirection("desc");
                    setSortField("name");
                  }}
                >
                  Name {sortField === "popular" ? "" : <ArrowUpwardIcon />}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setSortDirection("asc");
                    setSortField("name");
                  }}
                >
                  Name {sortField === "popular" ? "" : <ArrowDownwardIcon />}
                </Button>
              )}
            </TableCell>
            <TableCell align="right" sx={{ paddingRight: "6px" }}>
              {sortDirection === "asc" ? (
                <Button
                  onClick={() => {
                    setSortDirection("desc");
                    setSortField("popular");
                  }}
                >
                  {sortField === "name" ? "" : <ArrowUpwardIcon />} Count
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setSortDirection("asc");
                    setSortField("popular");
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
  );
}
