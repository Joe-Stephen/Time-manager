import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type TableRowData = {
  [key: string]: string | number | boolean;
};

interface MaterialTableProps {
  data: TableRowData[];
}

const MaterialTable: React.FC<MaterialTableProps> = ({ data }) => {
  if (!data.length) {
    return <p>No data available</p>;
  }

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 300, overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, idx) => (
                <TableCell key={idx}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
