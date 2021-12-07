import { useFormik } from 'formik';
import { filter, includes, orderBy } from 'lodash';
// material
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import {
  styled
  // useTheme
} from '@mui/material/styles';
// hooks
import { useEffect, useState } from 'react';
import SevenBreadGridItem1 from '../../components/_sevenbread/realtime/SevenBreadGridItem1';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import fakeRequest from '../../utils/fakeRequest';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { ConditionFiltered, ConditionFilterSidebar, ConditionSort } from '../../components/_sevenbread';
import useFirebaseRealtime from '../../hooks/useFirebase';
import LoadingScreen from '../../components/LoadingScreen';
import { filterSevenBreadItems } from '../../redux/slices/sevenBread';

// ----------------------------------------------------------------------

const ContainerWithoutLPadding = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingLeft: 0
  },
  [theme.breakpoints.up('xs')]: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));
const ContainerWithoutRPadding = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingRight: 0
  },
  [theme.breakpoints.up('xs')]: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

const CustomLoadingScreen = ({ message }) => (
  <Grid item xs={12} md={12}>
    <Box sx={{ justifyContent: 'center', p: 0, mt: 6 }}>
      <LoadingScreen />
      <Typography sx={{ mt: 8, textAlign: 'center' }}>{message}</Typography>
    </Box>
  </Grid>
);

function applyFilter(sevenBreadItems, sortBy, filters) {
  console.log('before applyFilter');
  console.log(sevenBreadItems);
  // SORT BY
  if (sortBy === 'earningRateDesc') {
    sevenBreadItems = orderBy(sevenBreadItems, ['fluctuationRateBy'], ['desc']);
  }
  if (sortBy === 'detectedTimeDesc') {
    sevenBreadItems = orderBy(sevenBreadItems, ['alarmedTime'], ['desc']);
  }
  if (sortBy === 'ascentRateTodayDest') {
    sevenBreadItems = orderBy(sevenBreadItems, ['fluctuationRate'], ['desc']);
  }
  if (sortBy === 'detectedDateDesc') {
    sevenBreadItems = orderBy(sevenBreadItems, ['capturedDate'], ['desc']);
  }
  // if (sortBy === 'newest') {
  //   products = orderBy(products, ['createdAt'], ['desc']);
  // }
  // if (sortBy === 'priceDesc') {
  //   products = orderBy(products, ['price'], ['desc']);
  // }
  // if (sortBy === 'priceAsc') {
  //   products = orderBy(products, ['price'], ['asc']);
  // }
  // // FILTER PRODUCTS
  // if (filters.color.length > 0) {
  //   products = filter(products, (_product) => includes(filters.gender, _product.gender));
  // }
  // if (filters.sevenBreadItems !== 'All') {
  //   sevenBreadItems = filter(sevenBreadItems, (_sevenBreadItems) => _sevenBreadItems.category === filters.category);
  // }
  // if (filters.colors.length > 0) {
  //   products = filter(products, (_product) => _product.colors.some((color) => filters.colors.includes(color)));
  // }
  if (filters.price) {
    sevenBreadItems = filter(sevenBreadItems, (_sevenBreadItems) => {
      if (filters.price === '현재가 > 기관매수가') {
        return _sevenBreadItems.presentPrice >= _sevenBreadItems.capturedPrice;
      }
      if (filters.price === '현재가 < 기관매수가') {
        return _sevenBreadItems.presentPrice < _sevenBreadItems.capturedPrice;
      }
      return true;
    });
  }
  // if (filters.rating) {
  //   products = filter(products, (_product) => {
  //     const convertRating = (value) => {
  //       if (value === 'up4Star') return 4;
  //       if (value === 'up3Star') return 3;
  //       if (value === 'up2Star') return 2;
  //       return 1;
  //     };
  //     return _product.totalRating > convertRating(filters.rating);
  //   });
  // }
  return sevenBreadItems;
}

export default function SevenBreadRealTime() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const {
    todaySnapshots,
    tLoading,
    tError,
    macaronSnapshots,
    mLoading,
    mError,
    sevenBreadSnapshots,
    sLoading,
    sError
  } = useFirebaseRealtime();
  const [swingBigPie, setSwingBigPie] = useState([]);
  const [dayTradingBigPie, setDayTradingBigPie] = useState([]);
  const { sortBy, filters } = useSelector((state) => state.sevenBread);
  const filteredSevenBreadItems = applyFilter(
    sevenBreadSnapshots.map((item) => item.val()),
    sortBy,
    filters
  );

  const formik = useFormik({
    initialValues: {
      price: filters.price
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  // const isDefault = values.price === '현재가 > 기관매수가';
  const isDefault = false;

  useEffect(() => {
    try {
      todaySnapshots.forEach((v) => console.log(v.val()));
      setSwingBigPie(todaySnapshots);
      console.log(tLoading);
    } catch (error) {
      console.log(error);
    }
  }, [todaySnapshots]);

  useEffect(() => {
    try {
      macaronSnapshots.forEach((v) => console.log(v.val()));
      setDayTradingBigPie(macaronSnapshots);
    } catch (error) {
      console.log(error);
    }
  }, [macaronSnapshots]);

  useEffect(() => {
    dispatch(filterSevenBreadItems(values));
  }, [sevenBreadSnapshots, values]);

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="007빵 실시간 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="007빵 실시간"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.sevenBread },
            { name: '007빵', href: PATH_DASHBOARD.sevenBread.root },
            { name: '실시간' }
          ]}
        />
        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {filteredSevenBreadItems.length}
            </Typography>
            &nbsp;개 종목이 포착되었습니다.
          </Typography>
        )}
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <ConditionFiltered
            filters={filters}
            formik={formik}
            isShowReset={openFilter}
            onResetFilter={handleResetFilter}
            isDefault={isDefault}
          />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ConditionFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ConditionSort />
          </Stack>
        </Stack>
        <Grid
          container
          spacing={1}
          // spacing={3}
        >
          {filteredSevenBreadItems.length === 0 ? (
            <CustomLoadingScreen message="종목 검색 중..." />
          ) : (
            <Grid container spacing={3}>
              {filteredSevenBreadItems.map((item) => (
                <Grid item xs={12} md={3} key={item.itemCode}>
                  <SevenBreadGridItem1
                    itemName={item.itemName}
                    majorHandler={item.majorHandler}
                    presentPrice={item.presentPrice}
                    fluctuationRate={item.fluctuationRate}
                    capturedPrice={item.capturedPrice}
                    fluctuationRateBy={item.fluctuationRateBy}
                    capturedDate={item.capturedDate}
                    alarmedTime={item.alarmedTime}
                    itemCode={item.itemCode}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {/* <Grid item xs={6} md={3}>
            <ContainerWithoutRPadding>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <BigPieGridTitle
                    title="단타용"
                    subtitle="바로 매수 가능"
                    message="(장중 단타가능, 스윙가능) 매도호가가 매수호가보다 많고 (호가창 강의 필수시청) 체결강도가 높은 종목이 실시간으로 노출됩니다."
                  />
                </Grid>
                {dayTradingBigPie.length === 0 ? (
                  <CustomLoadingScreen message="종목 검색 중..." />
                ) : (
                  dayTradingBigPie.map((item) => {
                    const {
                      close,
                      code,
                      firsttime,
                      // eslint-disable-next-line camelcase
                      fluctuation_rate,
                      name,
                      party,
                      updatetime
                    } = item.val();

                    return (
                      <Grid item xs={12} md={12} key={code}>
                        <BigPieGridItem1
                          // eslint-disable-next-line radix
                          movingAverage={parseInt(party.replace('일선', ''))}
                          itemCode={code}
                          itemName={name}
                          // eslint-disable-next-line camelcase
                          fluctuationRate={parseFloat(fluctuation_rate)}
                          // eslint-disable-next-line radix
                          closingPrice={parseInt(close)}
                          createdAt={firsttime}
                          updatedAt={updatetime}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </ContainerWithoutRPadding>
          </Grid> */}
          {/* <Grid item xs={6} md={9}>
            <ContainerWithoutLPadding>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <BigPieGridTitle
                    title="스윙용"
                    subtitle="15시부근 매수해서 3일 유지"
                    message="(스윙가능) 유통주식 상위종목+빅파이+마카롱에 떴었으나 현재는 마카롱조건에 해당되지 않는 종목이 노출됩니다. 오늘의 검색 종목에 표시되어있고 5%가 넘지 않았다면 15:00부근 종가매수가 가능합니다."
                  />
                </Grid>
                {swingBigPie.length === 0 ? (
                  <CustomLoadingScreen message="종목 검색 중..." />
                ) : (
                  swingBigPie.map((item) => {
                    const {
                      close,
                      code,
                      firsttime,
                      // eslint-disable-next-line camelcase
                      fluctuation_rate,
                      name,
                      party,
                      updatetime
                    } = item.val();

                    return (
                      <Grid item xs={12} md={4} key={code}>
                        <BigPieGridItem1
                          // eslint-disable-next-line radix
                          movingAverage={parseInt(party.replace('일선', ''))}
                          itemCode={code}
                          itemName={name}
                          // eslint-disable-next-line camelcase
                          fluctuationRate={parseFloat(fluctuation_rate)}
                          // eslint-disable-next-line radix
                          closingPrice={parseInt(close)}
                          createdAt={firsttime}
                          updatedAt={updatetime}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </ContainerWithoutLPadding>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
