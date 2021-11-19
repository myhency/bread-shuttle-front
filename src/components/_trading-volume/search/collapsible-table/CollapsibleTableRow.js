import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Box, Table, Collapse, TableRow, TableHead, TableBody, TableCell, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { path, PATH_ALPHA_LINK } from '../../../../routes/paths';

// ----------------------------------------------------------------------

CollapsibleTable.propTypes = {
  row: PropTypes.array,
  title: PropTypes.string
};

export default function CollapsibleTable(props) {
  const { row, title } = props;
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Icon icon={open ? arrowIosUpwardFill : arrowIosDownwardFill} />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: '#fafafa' }}>
                    <TableCell>종목명</TableCell>
                    <TableCell align="right">현재가</TableCell>
                    <TableCell align="right">등락율</TableCell>
                    <TableCell align="right">거래량</TableCell>
                    <TableCell align="right">유통 주식수 대비 거래량</TableCell>
                    <TableCell align="right">시가총액(억원)</TableCell>
                    <TableCell>테마</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((volumeData) => {
                    const volumeBy =
                      Math.round((volumeData.volume / (volumeData.numberOfOutstandingShares * 1000)) * 100 * 100) / 100;
                    const chartLink = path(PATH_ALPHA_LINK, volumeData.itemCode);

                    return (
                      <TableRow key={volumeData.id}>
                        <TableCell scope="row" padding="normal">
                          <Typography
                            sx={{
                              color: '#0061B0',
                              cursor: 'pointer',
                              fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' }
                            }}
                            onClick={() => window.open(chartLink, '_blank')}
                          >
                            {volumeData.itemName}
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal" align="right">
                          <Typography sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}>
                            {new Intl.NumberFormat('ko-KR').format(volumeData.closingPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal" align="right">
                          <Typography
                            sx={{
                              fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' },
                              color: volumeData.fluctuationRate > 0 ? theme.palette.error.main : theme.palette.info.main
                            }}
                          >
                            {volumeData.fluctuationRate}%
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal" align="right">
                          <Typography sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}>
                            {new Intl.NumberFormat('ko-KR').format(volumeData.volume)}
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal" align="right">
                          <Typography sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}>
                            {volumeBy}%
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal" align="right">
                          <Typography sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}>
                            {new Intl.NumberFormat('ko-KR').format(Math.round(volumeData.marketCap))}
                          </Typography>
                        </TableCell>
                        <TableCell scope="row" padding="normal">
                          <Typography sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}>
                            {volumeData.theme}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
