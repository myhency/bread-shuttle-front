import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import {
  Paper,
  Stack,
  Box,
  Table,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { path, PATH_M_ALPHA_LINK } from '../../../../routes/paths';

// ----------------------------------------------------------------------

CollapsibleTable.propTypes = {
  row: PropTypes.array,
  title: PropTypes.string
};

const getOthers = (volumeData) => {
  const volumeBy = Math.round((volumeData.volume / (volumeData.numberOfOutstandingShares * 1000)) * 100 * 100) / 100;
  const amount = Math.round((volumeData.volume * volumeData.closingPrice) / 100000000);
  const mChartLink = path(PATH_M_ALPHA_LINK, volumeData.itemCode);
  const chartEmoji = volumeData.fluctuationRate > 0 ? '📈 ' : '📉 ';
  const shortHandTheme =
    // eslint-disable-next-line no-nested-ternary
    volumeData.theme == null
      ? ''
      : volumeData.theme.length > 35
      ? `${volumeData.theme.substring(0, 35)}...`
      : volumeData.theme;

  return { volumeBy, amount, chartEmoji, shortHandTheme, mChartLink };
};

export default function CollapsibleTable(props) {
  const { row, title } = props;
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  return (
    <>
      <TableRow>
        <TableCell sx={{ py: 0 }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Icon icon={open ? arrowIosUpwardFill : arrowIosDownwardFill} />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ py: 1 }}>
          {title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ pl: 0, pr: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: '#fafafa' }}>
                    <TableCell padding="none">
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row'
                        }}
                        key="header"
                      >
                        <Paper sx={{ flexGrow: 1, bgcolor: 'background.neutral' }}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems={{ sm: 'center' }}
                            justifyContent="space-between"
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row'
                              }}
                              key="header"
                            >
                              <Box
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <div>
                                  <Typography variant="caption">종목명</Typography>
                                </div>
                                <div>
                                  <Typography variant="caption">현재가</Typography>
                                </div>
                                <div>
                                  <Typography variant="caption">등락율</Typography>
                                </div>
                              </Box>
                              <Box
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                  flexGrow: 1
                                }}
                              >
                                <div
                                  style={{
                                    flexGrow: 1,
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Typography variant="caption">거래량%</Typography>
                                </div>
                                <div>
                                  <Typography variant="caption" style={{ color: '#747171' }}>
                                    거래대금
                                  </Typography>
                                </div>
                                <div>
                                  <Typography variant="caption" style={{ color: '#747171' }}>
                                    시가총액
                                  </Typography>
                                </div>
                              </Box>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((volumeData) => {
                    const { id, itemName, closingPrice, fluctuationRate, volume, marketCap, theme } = volumeData;
                    const { volumeBy, amount, mChartLink, chartEmoji, shortHandTheme } = getOthers(volumeData);

                    return (
                      <TableRow key={volumeData.id}>
                        <TableCell scope="row" padding="normal">
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              borderBottom: '1px solid lightgrey'
                            }}
                            key={id}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '10px 0px 5px 0px'
                              }}
                              key="header"
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <div>
                                  <Typography
                                    sx={{ color: '#0061B0', cursor: 'pointer' }}
                                    onClick={() => window.open(mChartLink, '_blank')}
                                  >
                                    {itemName}
                                  </Typography>
                                </div>
                                <div>
                                  <Typography variant="caption">
                                    {new Intl.NumberFormat('ko-KR').format(closingPrice)}원
                                  </Typography>
                                </div>
                                <div>
                                  <Typography
                                    style={{
                                      color: fluctuationRate > 0 ? 'red' : 'blue'
                                    }}
                                  >
                                    {chartEmoji}
                                    {fluctuationRate}%
                                  </Typography>
                                </div>
                              </Box>
                              <Box
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                  flexGrow: 1
                                }}
                              >
                                <div
                                  style={{
                                    flexGrow: 1,
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Typography>{volumeBy}%</Typography>
                                </div>
                                <div>
                                  <Typography variant="caption" style={{ color: '#747171' }}>
                                    {new Intl.NumberFormat('ko-KR').format(amount)}억
                                  </Typography>
                                </div>
                                <div>
                                  <Typography variant="caption" style={{ color: '#747171' }}>
                                    {new Intl.NumberFormat('ko-KR').format(Math.round(marketCap))}억
                                  </Typography>
                                </div>
                              </Box>
                            </Box>
                            <Box
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Typography variant="caption" style={{ color: '#747171' }}>
                                {shortHandTheme}
                              </Typography>
                            </Box>
                          </Box>
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
