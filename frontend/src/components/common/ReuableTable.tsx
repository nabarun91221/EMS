"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { User } from "@/store/useUserStore";
import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
export interface Column<T> {
  key: keyof T;
  label: string;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onClickPromote: (user:User) => Promise<void>;
}

function ReusableTable<T extends { _id: string }>({
  data,
  columns,
  onClickPromote
}: ReusableTableProps<T>) {
  

  const users = useUserStore((state) => state.users);
  const onClickHandler = (id: string) => {
  const selectedUser = users.find((user: User) => user._id === id);

  if (!selectedUser) return;

  onClickPromote(selectedUser);
  };
  useEffect(() => {
  console.log("[from table:] Users changed:", users);
},[users]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.label}
              </TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {String(row[column.key] ?? "")}
                </TableCell>
              ))}
              <TableCell><Button variant="outlined" color="success" onClick={()=>onClickHandler(row._id)}>PROMOTE</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReusableTable;