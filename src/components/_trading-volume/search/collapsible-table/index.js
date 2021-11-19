// material
import { Table, TableRow, TableHead, TableBody, TableCell, TableContainer } from '@mui/material';
// components
import Scrollbar from '../../../Scrollbar';
//
import CollapsibleTableRow from './CollapsibleTableRow';

// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  };
}

// const COLLAPSIBLE_TABLE = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
// ];

export default function CollapsibleTable({ data }) {
  const COLLAPSIBLE_TABLE = data;
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell width="3%" />
          <TableCell colSpan={5}>포착일</TableCell>
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
