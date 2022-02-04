import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  Typography,
  Stack,
  OutlinedInput,
  InputAdornment,
  Box
} from '@mui/material';
import * as styles from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchSevenBreadItems, deleteSevenBreadItemForArchive } from '../../../redux/slices/sevenBread';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { SevenBreadListHead, SevenBreadMoreMenu, TransitionsDialog } from '../../../components/_admin/sevenBread';
import LoadingScreen from '../../../components/LoadingScreen';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'itemName', label: '종목명', align: 'left' },
  { id: 'capturedDate', label: '기준일', align: 'left' },
  { id: 'capturedPrice', label: '기준일 종가(원)', align: 'right' },
  { id: 'capturedLowestPrice', label: '기준일 저가(원)', align: 'right' },
  { id: 'majorHandler', label: '수급주체', align: 'center' },
  { id: '' }
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

export default function SevenBreadManage() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { sevenBreadAdminItems, isLoading, error, deleteResult } = useSelector((state) => state.sevenBread);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [sevenBreadItemList, setSevenBreadItemList] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteRequestedItem, setDeleteRequestedItem] = useState({});

  useEffect(() => {
    dispatch(fetchSevenBreadItems());
  }, [dispatch]);

  useEffect(() => {
    setSevenBreadItemList(sevenBreadAdminItems);
  }, [sevenBreadAdminItems]);

  useEffect(() => {
    if (deleteResult !== '') {
      enqueueSnackbar('삭제가 완료완료되었습니다.', {
        variant: 'success'
      });
    }

    if (error) {
      enqueueSnackbar('삭제중 문제가 발생하였습니다.', {
        variant: 'error'
      });
    }

    dispatch(fetchSevenBreadItems());
  }, [error, deleteResult]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteDialogClose = async (type, item, date) => {
    const { itemCode } = item;

    dispatch(deleteSevenBreadItemForArchive(itemCode, date, type));

    setOpenDeleteDialog(false);
  };

  const handleDeleteSevenBreadItemDelete = ({ itemCode, itemName }) => {
    setOpenDeleteDialog(true);
    setDeleteRequestedItem({ itemCode, itemName });
  };

  const filteredItems = applySortFilter(sevenBreadItemList, getComparator(order, orderBy), filterName);

  const isItemNotFound = filteredItems.length === 0;

  return (
    <Page title="Admin: 007빵 종목관리 | Cloud's pick">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="007빵 종목관리"
          links={[
            { name: 'Admin', href: PATH_ADMIN.root },
            { name: '007빵', href: PATH_ADMIN.sevenBread.root },
            { name: '종목관리' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_ADMIN.sevenBread.newItem}
              startIcon={<Icon icon={plusFill} />}
            >
              종목추가
            </Button>
          }
        />

        <Typography gutterBottom>
          <Typography component="span" variant="subtitle1">
            {`${sevenBreadItemList.length}개의 종목이 등록되어 있습니다.`}
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

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Card sx={{ pt: 3 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <SevenBreadListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={sevenBreadItemList.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredItems.map((row) => {
                      const { capturedDate, capturedPrice, itemCode, itemName, lowestPrice, majorHandler } = row;

                      return (
                        <TableRow hover key={itemCode}>
                          <TableCell align="left">{itemName}</TableCell>
                          <TableCell align="left">{capturedDate}</TableCell>
                          <TableCell align="right">{new Intl.NumberFormat('ko-KR').format(capturedPrice)}</TableCell>
                          <TableCell align="right">{new Intl.NumberFormat('ko-KR').format(lowestPrice)}</TableCell>
                          <TableCell align="center">
                            {/* eslint-disable-next-line no-nested-ternary */}
                            {majorHandler === 'G' ? '기관' : majorHandler === 'W' ? '외인' : '기관/외인'}
                          </TableCell>
                          <TableCell align="right">
                            <SevenBreadMoreMenu
                              onDelete={() => handleDeleteSevenBreadItemDelete({ itemCode, itemName })}
                              itemCode={itemCode}
                            />
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
        )}
      </Container>
      <TransitionsDialog
        openDeleteDialog={openDeleteDialog}
        item={deleteRequestedItem}
        handleDeleteDialogClose={(type, item, date) => handleDeleteDialogClose(type, item, date)}
      />
    </Page>
  );
}
