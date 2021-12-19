import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import * as styles from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  OutlinedInput,
  InputAdornment,
  Box,
  TextField
} from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
import { getStockItemList } from '../../redux/slices/stockItem';
import { fetchSevenBreadItems } from '../../redux/slices/sevenBread';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ConditionFilter } from '../../components/_trading-volume/list';
import { SevenBreadListHead, SevenBreadMoreMenu } from '../../components/_admin/sevenBread';
import IconLinkBox from '../../components/_share/IconLinkBox';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'links', label: '유용한 링크', align: 'center' },
  { id: 'itemName', label: '종목명', align: 'left' },
  { id: 'capturedDate', label: '기준일', align: 'left' },
  { id: 'capturedPrice', label: '기준일 종가(원)', align: 'right' },
  { id: 'capturedLowestPrice', label: '기준일 저가(원)', align: 'right' },
  { id: 'majorHandler', label: '수급주체', align: 'center' }
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

function descendingComparator(a, b, orderBy) {
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_sevenBreadItem) => _sevenBreadItem.itemName.indexOf(query) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SevenBreadList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sevenBreadAdminItems } = useSelector((state) => state.sevenBread);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('capturedDate');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(fetchSevenBreadItems());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleRowOnClick = (event, itemCode) => {
    console.log(itemCode);
    console.log(event);
    // navigate(PATH_ADMIN.sevenBread.management);
  };

  const filteredItems = applySortFilter(sevenBreadAdminItems, getComparator(order, orderBy), filterName);

  const isItemNotFound = filteredItems.length === 0;

  return (
    <Page title="007빵 리스트 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="007빵 리스트"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.sevenBread },
            { name: '007빵', href: PATH_DASHBOARD.sevenBread.root },
            { name: '리스트' }
          ]}
        />
        <Typography gutterBottom>
          <Typography component="span" variant="subtitle1">
            {`${sevenBreadAdminItems.length}개의 종목이 등록되어 있습니다.`}
          </Typography>
        </Typography>

        <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap" alignContent="space-around">
            <SearchStyle
              name="searchInput"
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', cursor: 'pointer' }} />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>

        <Card sx={{ pt: 3 }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SevenBreadListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sevenBreadAdminItems.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredItems.map((row) => {
                    const { capturedDate, capturedPrice, itemCode, itemName, lowestPrice, majorHandler } = row;

                    return (
                      <TableRow hover key={itemCode}>
                        <TableCell align="center">
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} spacing={2}>
                              <IconLinkBox itemCode={itemCode} itemName={itemName} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left" onClick={(event) => handleRowOnClick(event, itemCode)}>
                          {itemName}
                        </TableCell>
                        <TableCell align="left" onClick={(event) => handleRowOnClick(event, itemCode)}>
                          {capturedDate}
                        </TableCell>
                        <TableCell align="right" onClick={(event) => handleRowOnClick(event, itemCode)}>
                          {new Intl.NumberFormat('ko-KR').format(capturedPrice)}
                        </TableCell>
                        <TableCell align="right" onClick={(event) => handleRowOnClick(event, itemCode)}>
                          {new Intl.NumberFormat('ko-KR').format(lowestPrice)}
                        </TableCell>
                        <TableCell align="center" onClick={(event) => handleRowOnClick(event, itemCode)}>
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {majorHandler === 'G' ? '기관' : majorHandler === 'W' ? '외인' : '기관/외인'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {isItemNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
