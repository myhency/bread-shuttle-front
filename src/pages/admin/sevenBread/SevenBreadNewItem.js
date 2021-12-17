import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getStockItemList } from '../../../redux/slices/stockItem';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import SevenBreadNewForm from '../../../components/_admin/sevenBread/SevenBreadNewForm';

// ----------------------------------------------------------------------

export default function SevenBreadNewItem() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { itemCode } = useParams();
  const { stockItemList } = useSelector((state) => state.stockItem);
  const isEdit = pathname.includes('edit');
  const currentUser = 'James';

  useEffect(() => {
    dispatch(getStockItemList(5000, 0));
  }, [dispatch]);

  return (
    <Page title={`Admin: 007빵 종목${!isEdit ? '추가' : '수정'} | 클라우드의 주식훈련소`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '007빵 종목추가' : '007빵 종목수정'}
          links={[
            { name: 'Admin', href: PATH_ADMIN.root },
            { name: '007빵', href: PATH_ADMIN.sevenBread.root },
            { name: !isEdit ? '종목추가' : itemCode }
          ]}
        />

        <SevenBreadNewForm
          isEdit={isEdit}
          stockItemList={stockItemList}
          currentUser={currentUser}
          itemCode={itemCode}
        />
      </Container>
    </Page>
  );
}
