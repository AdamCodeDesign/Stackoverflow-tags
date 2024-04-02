import React, { useState } from "react";
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

export default function TagsTable({ tags }) {
  const [sortField, setSortField] = useState("count");
  const [sortDirection, setSortDirection] = useState("z-a");

  tags.sort((a, b) => {
    const compareValue = sortDirection === "a-z" ? 1 : -1;
    return a[sortField] > b[sortField] ? compareValue : -compareValue;
  });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ paddingLeft: "6px" }}>
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
                  Name {sortField === "count" ? "" : <ArrowDownwardIcon />}
                </Button>
              )}
            </TableCell>
            <TableCell align="right" sx={{ paddingRight: "6px" }}>
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
  );
}
