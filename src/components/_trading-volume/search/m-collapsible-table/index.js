// material
import { TableRow, TableHead, TableBody, TableCell } from '@mui/material';
// components
import CollapsibleTableRow from './CollapsibleTableRow';

// ----------------------------------------------------------------------

export default function CollapsibleTable({ data }) {
  const COLLAPSIBLE_TABLE = data;
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell width="3%" />
          <TableCell component="th" scope="row">
            포착일
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {COLLAPSIBLE_TABLE.map((row, i) => (
          <CollapsibleTableRow
            key={Object.keys(row) + String(i)}
            row={row[Object.keys(row)[0]]}
            title={Object.keys(row)[0]}
          />
        ))}
      </TableBody>
    </>
  );
}
