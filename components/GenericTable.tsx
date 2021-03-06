import * as React from "react";
import { memo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { shortenAddress } from "../lib/helpers";

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
                        {headers && headers.length > 0 && headers.map((header, index) => {
                            return <TableCell align="right" key={index}>{header}</TableCell>;
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.length > 0 && rows.map((row, index) => (
                        <TableRow key={index} onClick={() => onRowClick(row)} hover>
                            {
                                Object.values(row).map((value, index) => {
                                    if (typeof value === "object") {
                                        return <TableCell key={index}>{JSON.stringify(value)}</TableCell>;
                                    }
                                    if (String(value).slice(0, 2) === "0x") {
                                        return <TableCell key={index}>{shortenAddress(String(value), 12)}</TableCell>;
                                    }
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