import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useMediaQuery } from 'react-responsive';
import searchFill from '@iconify/icons-eva/search-fill';
import { useState, useEffect, useRef } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TextField,
  OutlinedInput,
  InputAdornment,
  Box,
  Paper
} from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import * as styles from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { fetchTradingVolumeDateList, fetchTradingVolumeList } from '../../redux/slices/tradingVolume';
// routes
import { path, PATH_ALPHA_LINK, PATH_M_ALPHA_LINK, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ConditionFilter,
  TradingVolumeListHead,
  TradingVolumeListToolbar
} from '../../components/_trading-volume/list';
// utils
import { fDateStringFormat } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'itemName', label: '종목명', alignRight: false },
  { id: 'closingPrice', label: '현재가', alignRight: true },
  { id: 'fluctuationRate', label: '등락율', alignRight: true },
  { id: 'volume', label: '거래량', alignRight: true },
  { id: 'numberOfOutstandingShares', label: '유통주식수대비 거래량', alignRight: true },
  { id: 'amount', label: '거래대금(억)', alignRight: true },
  { id: 'marketCap', label: '시가총액', alignRight: true },
  { id: 'theme', label: '테마', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'numberOfOutstandingShares') {
    if (b.volume / b.numberOfOutstandingShares < a.volume / a.numberOfOutstandingShares) {
      return -1;
    }
    if (b.volume / b.numberOfOutstandingShares > a.volume / a.numberOfOutstandingShares) {
      return 1;
    }
    return 0;
  }

  if (orderBy === 'amount') {
    if (b.volume * b.closingPrice < a.volume * a.closingPrice) {
      return -1;
    }
    if (b.volume * b.closingPrice > a.volume * a.closingPrice) {
      return 1;
    }
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const SearchStyle = styles.styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const CellText = styles.styled(Typography)(() => ({
  fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' }
}));

const SMHead = ({ data }) => (
  <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row'
      }}
      p={1}
      key="header"
    >
      <Paper sx={{ p: 1, flexGrow: 1, bgcolor: 'background.neutral' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
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
                <Typography variant="caption" style={{ color: '#303C6C' }}>
                  종목명
                </Typography>
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
                <Typography variant="caption">유통주식수대비 거래량</Typography>
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
    {data.map((row) => {
      const { id, itemName, closingPrice, fluctuationRate, volume, marketCap, theme } = row;
      const { volumeBy, amount, mChartLink, chartEmoji, shortHandTheme } = getOthers(row);

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid lightgrey'
          }}
          p={1.5}
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
                <Typography variant="caption">{new Intl.NumberFormat('ko-KR').format(closingPrice)}원</Typography>
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
      );
    })}
  </>
);

const getOthers = (volumeData) => {
  const volumeBy = Math.round((volumeData.volume / (volumeData.numberOfOutstandingShares * 1000)) * 100 * 100) / 100;
  const amount = Math.round((volumeData.volume * volumeData.closingPrice) / 100000000);
  const chartLink = path(PATH_ALPHA_LINK, volumeData.itemCode);
  const mChartLink = path(PATH_M_ALPHA_LINK, volumeData.itemCode);
  const chartEmoji = volumeData.fluctuationRate > 0 ? '📈 ' : '📉 ';
  const shortHandTheme =
    // eslint-disable-next-line no-nested-ternary
    volumeData.theme == null
      ? ''
      : volumeData.theme.length > 35
      ? `${volumeData.theme.substring(0, 35)}...`
      : volumeData.theme;

  return { volumeBy, amount, chartLink, chartEmoji, shortHandTheme, mChartLink };
};

export default function TradingVolumeList() {
  const thema = useTheme();
  const { themeStretch } = useSettings();
  const isSM = useMediaQuery({
    query: '(max-width: 600px)'
  });
  const searchForm = useRef();
  const [value, setValue] = useState(new Date('2021-09-17'));
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [isKospi, setKospi] = useState(false);
  const [orderBy, setOrderBy] = useState('numberOfOutstandingShares');
  const [filteredTradingVolumeItems, setFilteredTradingVolumeItems] = useState([]);
  const dispatch = useDispatch();
  const { tradingVolumeDateList, tradingVolumeItems, filterBy, isLoading } = useSelector(
    (state) => state.tradingVolume
  );
  const isDefault = tradingVolumeDateList.length === 0;

  useEffect(() => {
    dispatch(fetchTradingVolumeDateList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTradingVolumeList(fDateStringFormat(value)));
  }, [dispatch, value, tradingVolumeDateList]);

  useEffect(() => {
    setFilteredTradingVolumeItems(getSortedAndFilteredList(tradingVolumeItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradingVolumeItems, isKospi]);

  useEffect(() => {
    searchForm.current.children.searchInput.focus();
  }, [filterBy]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    if (!event.target.value) {
      setFilteredTradingVolumeItems(getSortedAndFilteredList(tradingVolumeItems));
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const filteredItems = applySortFilter(filteredTradingVolumeItems, getComparator(order, property));
    setFilteredTradingVolumeItems(filteredItems);
  };

  const handleOnChecked = (event, isKospi) => {
    setKospi(isKospi);
  };

  const getSortedAndFilteredList = (list, type) => {
    const mapped = list.map((el, i) => ({
      index: i,
      value: el.volume / el.numberOfOutstandingShares
    }));
    mapped.sort((a, b) => b.value - a.value);

    const result = mapped
      .map((el) => list[el.index])
      .filter((item) => {
        if (isKospi) {
          return item.marketType === 'Kosdaq';
        }

        return item.marketType === 'Kospi';
      });

    return result;
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && filterName !== '') {
      handleSearchButtonOnClick();
    }
  };

  const handleSearchButtonOnClick = () => {
    const x = searchForm.current.children.searchInput.value;
    const items = getSortedAndFilteredList(tradingVolumeItems);
    const result =
      filterBy === 'itemName'
        ? items.filter((item) => item.itemName.includes(x))
        : items.filter((item) => (item.theme === null ? false : item.theme.includes(x)));

    setFilteredTradingVolumeItems(result);
  };

  const isItemNotFound = filteredTradingVolumeItems.length === 0;

  return (
    <Page title="유통주식수대비 거래량 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="날짜별 조회"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.tradingVolume },
            { name: '유통주식수대비 거래량', href: PATH_DASHBOARD.tradingVolume.root },
            { name: '날짜별 조회' }
          ]}
        />
        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {`${tradingVolumeDateList[tradingVolumeDateList.length - 1]} ~ ${
                tradingVolumeDateList[0]
              } 까지의 종목을 확인할 수 있습니다.`}
            </Typography>
          </Typography>
        )}
        <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
          <DesktopDatePicker
            textFieldStyle={{ width: '20%' }}
            label="날짜를 선택하세요"
            value={value}
            inputFormat="yyyy-MM-dd"
            mask="____-__-__"
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />

          <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap" alignContent="space-around">
            <ConditionFilter />
            <SearchStyle
              name="searchInput"
              ref={searchForm}
              value={filterName}
              onChange={handleFilterByName}
              onKeyDown={handleOnKeyDown}
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', cursor: 'pointer' }}
                    onClick={handleSearchButtonOnClick}
                  />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>
        <Card>
          <TradingVolumeListToolbar onChecked={handleOnChecked} />
          <Scrollbar>
            {isSM ? (
              <SMHead data={filteredTradingVolumeItems} />
            ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TradingVolumeListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={filteredTradingVolumeItems.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredTradingVolumeItems.map((row) => {
                      const { id, itemName, closingPrice, fluctuationRate, volume, marketCap, theme } = row;
                      const { volumeBy, amount, chartLink, chartEmoji, shortHandTheme } = getOthers(row);

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">
                            <Typography
                              sx={{
                                color: '#0061B0',
                                cursor: 'pointer',
                                fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' }
                              }}
                              onClick={() => window.open(chartLink, '_blank')}
                            >
                              {itemName}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {new Intl.NumberFormat('ko-KR').format(closingPrice)}원
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              sx={{
                                fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' },
                                color: fluctuationRate > 0 ? thema.palette.error.main : thema.palette.info.main
                              }}
                            >
                              {fluctuationRate}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {new Intl.NumberFormat('ko-KR').format(volume)}
                            </Typography>
                          </TableCell>
                          <TableCell scope="row" align="right">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {volumeBy}
                            </Typography>
                          </TableCell>
                          <TableCell scope="row" align="right">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {new Intl.NumberFormat('ko-KR').format(amount)}
                            </Typography>
                          </TableCell>
                          <TableCell scope="row" align="right">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {new Intl.NumberFormat('ko-KR').format(Math.round(marketCap))}
                            </Typography>
                          </TableCell>
                          <TableCell scope="row" align="left">
                            <Typography
                              sx={{ fontSize: { lg: '1rem', md: '0.875rem', sm: '0.875rem', xs: '0.875rem' } }}
                            >
                              {theme}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  {isItemNotFound && !isLoading && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={TABLE_HEAD.length} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
