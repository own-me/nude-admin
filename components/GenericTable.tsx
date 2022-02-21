import * as React from "react";
import { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface GenericTableProps {
    headers: string[];
    rows: any[];
}

const GenericTable = memo(({ headers, rows }: GenericTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => {
                            return <TableCell align="right" key={index}>{header}</TableCell>;
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {
                                Object.values(row).map((value, index) => {
                                    console.log(value);
                                    return <TableCell align="right" key={index}>{value}</TableCell>;
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default GenericTable;