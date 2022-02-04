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
  TableHead,
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
import * as styles from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  fetchTradingVolumeDateList,
  fetchTradingVolumeList,
  fetchTradingVolumeListByFilter
} from '../../redux/slices/tradingVolume';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CollapsibleTable from '../../components/_trading-volume/search/collapsible-table';
import MCollapsibleTable from '../../components/_trading-volume/search/m-collapsible-table';
import LoadingScreen from '../../components/LoadingScreen';
// redux
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

const NotFoundDataTableBody = () => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={TABLE_HEAD.length} sx={{ py: 3 }}>
        <SearchNotFound />
      </TableCell>
    </TableRow>
  </TableBody>
);

const LoadingTableBody = () => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={TABLE_HEAD.length} sx={{ py: 3 }}>
        <LoadingScreen sx={{ my: 24 }} />
      </TableCell>
    </TableRow>
  </TableBody>
);

const getOthers = (volumeData) => {
  const volumeBy = Math.round((volumeData.volume / (volumeData.numberOfOutstandingShares * 1000)) * 100 * 100) / 100;
  const amount = Math.round((volumeData.volume * volumeData.closingPrice) / 100000000);
  const chartLink = `https://alphasquare.co.kr/home/stock/stock-summary?code=${volumeData.itemCode}`;
  const mChartLink = `https://m.alphasquare.co.kr/service/chart?code=${volumeData.itemCode}`;
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

export default function TradingVolumeSearch() {
  const { themeStretch } = useSettings();
  const isSM = useMediaQuery({
    query: '(max-width: 600px)'
  });
  const searchForm = useRef();
  const [filterName, setFilterName] = useState('');
  const [collapsedVolumeDateList, setCollapsedVolumeDateList] = useState([]);
  const dispatch = useDispatch();
  const { tradingVolumeDateList, tradingVolumeItems, tradingVolumeItemsByFilter, filterBy, isLoading } = useSelector(
    (state) => state.tradingVolume
  );
  const isDefault = tradingVolumeDateList.length === 0;

  useEffect(() => {
    dispatch(fetchTradingVolumeDateList());
  }, [dispatch]);

  useEffect(() => {
    searchForm.current.children.searchInput.focus();
  }, [filterBy]);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let obj = {};
    tradingVolumeItemsByFilter.forEach((v) => {
      if (!(`${v.createdDate.split('T')[0]}` in obj)) {
        const key = v.createdDate.split('T')[0];
        obj[key] = [];
      }
    });
    tradingVolumeItemsByFilter.forEach((item) => {
      const key = item.createdDate.split('T')[0];
      obj[key].push({
        ...item
      });
    });

    // eslint-disable-next-line prefer-const
    let arr = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      // eslint-disable-next-line prefer-const
      let o = {};
      const k = key;
      o[k] = value;
      arr.push(o);
    }

    setCollapsedVolumeDateList(arr);
  }, [tradingVolumeItemsByFilter]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    // if (!event.target.value) {
    //   setCollapsedVolumeDateList(getSortedAndFilteredList(tradingVolumeItems));
    // }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && filterName !== '') {
      handleSearchButtonOnClick();
    }
  };

  const handleSearchButtonOnClick = () => {
    const by = filterBy === 'itemName' ? 1 : 2;
    dispatch(fetchTradingVolumeListByFilter(by, filterName));
  };

  const isItemNotFound = collapsedVolumeDateList.length === 0;

  return (
    <Page title="유통주식수대비 거래량 | Cloud's pick">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="통합검색"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.tradingVolume },
            { name: '유통주식수대비 거래량', href: PATH_DASHBOARD.tradingVolume.root },
            { name: '통합검색' }
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
        <Card sx={{ py: 3 }}>
          <Scrollbar>
            {isSM ? (
              <TableContainer sx={{ minWidth: 300 }}>
                <Table>
                  <MCollapsibleTable data={collapsedVolumeDateList} />
                  {isItemNotFound && !isLoading && <NotFoundDataTableBody />}
                  {isLoading && <LoadingTableBody />}
                </Table>
              </TableContainer>
            ) : (
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <CollapsibleTable data={collapsedVolumeDateList} />
                  {isItemNotFound && !isLoading && <NotFoundDataTableBody />}
                  {isLoading && <LoadingTableBody />}
                </Table>
              </TableContainer>
            )}
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
