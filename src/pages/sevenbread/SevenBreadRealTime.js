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
// utils
import fakeRequest from '../../utils/fakeRequest';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

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
      if (filters.price === '????????? > ???????????????') {
        return _sevenBreadItems.presentPrice >= _sevenBreadItems.capturedPrice;
      }
      if (filters.price === '????????? < ???????????????') {
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

  console.log(filteredSevenBreadItems);

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

  // const isDefault = values.price === '????????? > ???????????????';
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
    <Page title="????????? ????????? | ??????????????? ???????????????">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {filteredSevenBreadItems.length}
            </Typography>
            &nbsp;??? ????????? ?????????????????????.
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
            <CustomLoadingScreen message="?????? ?????? ???..." />
          ) : (
            <Grid container spacing={3}>
              {filteredSevenBreadItems.map((item) => {
                console.log(item);
                return (
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
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
          {/* <Grid item xs={6} md={3}>
            <ContainerWithoutRPadding>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <BigPieGridTitle
                    title="?????????"
                    subtitle="?????? ?????? ??????"
                    message="(?????? ????????????, ????????????) ??????????????? ?????????????????? ?????? (????????? ?????? ????????????) ??????????????? ?????? ????????? ??????????????? ???????????????."
                  />
                </Grid>
                {dayTradingBigPie.length === 0 ? (
                  <CustomLoadingScreen message="?????? ?????? ???..." />
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
                          movingAverage={parseInt(party.replace('??????', ''))}
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
                    title="?????????"
                    subtitle="15????????? ???????????? 3??? ??????"
                    message="(????????????) ???????????? ????????????+?????????+???????????? ???????????? ????????? ?????????????????? ???????????? ?????? ????????? ???????????????. ????????? ?????? ????????? ?????????????????? 5%??? ?????? ???????????? 15:00?????? ??????????????? ???????????????."
                  />
                </Grid>
                {swingBigPie.length === 0 ? (
                  <CustomLoadingScreen message="?????? ?????? ???..." />
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
                          movingAverage={parseInt(party.replace('??????', ''))}
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
