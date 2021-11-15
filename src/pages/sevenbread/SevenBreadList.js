import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
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
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
import { getStockItemList } from '../../redux/slices/stockItem';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

export default function SevenBreadList() {
  const { themeStretch } = useSettings();

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
      </Container>
    </Page>
  );
}
