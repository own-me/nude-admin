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
    onRowClick?: (row: any) => void;
}

const GenericTable = memo(({ headers, rows, onRowClick }: GenericTableProps) => {
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
                        <TableRow key={index} onClick={() => onRowClick(row)}>
                            {
                                Object.values(row).map((value, index) => {
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