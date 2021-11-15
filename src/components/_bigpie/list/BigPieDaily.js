/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
// material
import {
  Container,
  Grid,
  // Typography, Box,
  Skeleton
} from '@mui/material';
// useTheme
import { styled } from '@mui/material/styles';
// utils
import useSettings from '../../../hooks/useSettings';
// hooks
// import { useEffect, useState } from 'react';
// import useSettings from '../../../../hooks/useSettings';
// components
// import Page from '../../../Page';
// import {
//   EcommerceWelcome,
//   EcommerceNewProducts,
//   EcommerceProductSold,
//   EcommerceSalesProfit,
//   EcommerceYearlySales,
//   EcommerceBestSalesman,
//   EcommerceTotalBalance,
//   EcommerceSaleByGender,
//   EcommerceSalesOverview,
//   EcommerceLatestProducts,
//   EcommerceCurrentBalance
// } from '../../general-ecommerce';
// import { BigPieGridTitle, BigPieGridSubTitle, BigPieGridItem1 } from '..';
// import useFirebaseRealtime from '../../../../hooks/useFirebase';
// import LoadingScreen from '../../../LoadingScreen';
import BigPieMovingAverageTitle from '../BigPieMovingAverageTitle';
import BigPieGridItem2 from '../BigPieGridItem2';

const ContainerWithoutLPadding = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    maxWidth: '100%'
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: 0
  },
  [theme.breakpoints.up('xs')]: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export default function BigPieDaily({
  loading,
  // date,
  list
}) {
  const { themeStretch } = useSettings();
  const ma5 = list.length === 0 ? null : list[0].val().hasOwnProperty('5일선') ? list[0].val()['5일선'] : null;
  const ma10 = list.length === 0 ? null : list[0].val().hasOwnProperty('10일선') ? list[0].val()['10일선'] : null;
  const ma20 = list.length === 0 ? null : list[0].val().hasOwnProperty('20일선') ? list[0].val()['20일선'] : null;
  const ma40 = list.length === 0 ? null : list[0].val().hasOwnProperty('40일선') ? list[0].val()['40일선'] : null;

  return (
    // <Container maxWidth={themeStretch ? false : 'lg'}>
    <ContainerWithoutLPadding>
      <Grid container spacing={1}>
        <Grid item xs={6} md={3}>
          <ContainerWithoutLPadding>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                ) : (
                  <BigPieMovingAverageTitle movingAverage="5" />
                )}
              </Grid>
              {list.length === 0 ? (
                <>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                </>
              ) : !ma5 ? (
                <Grid item xs={12} md={12} sx={{ p: 0 }}>
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }}>
                    종목이 없습니다.
                  </Skeleton>
                </Grid>
              ) : (
                Object.entries(ma5).map((item) => {
                  console.log(item);
                  return (
                    <Grid key={item[1].code} item xs={12} md={12} sx={{ p: 0 }}>
                      <BigPieGridItem2 itemCode={item[1].code} itemName={item[1].name} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </ContainerWithoutLPadding>
        </Grid>
        <Grid item xs={6} md={3}>
          <ContainerWithoutLPadding>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                ) : (
                  <BigPieMovingAverageTitle movingAverage="10" />
                )}
              </Grid>
              {list.length === 0 ? (
                <>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                </>
              ) : !ma10 ? (
                <Grid item xs={12} md={12} sx={{ p: 0 }}>
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }}>
                    종목이 없습니다.
                  </Skeleton>
                </Grid>
              ) : (
                Object.entries(ma10).map((item) => {
                  console.log(item);
                  return (
                    <Grid key={item[1].code} item xs={12} md={12} sx={{ p: 0 }}>
                      <BigPieGridItem2 itemCode={item[1].code} itemName={item[1].name} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </ContainerWithoutLPadding>
        </Grid>
        <Grid item xs={6} md={3}>
          <ContainerWithoutLPadding>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                ) : (
                  <BigPieMovingAverageTitle movingAverage="20" />
                )}
              </Grid>
              {list.length === 0 ? (
                <>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                </>
              ) : !ma20 ? (
                <Grid item xs={12} md={12} sx={{ p: 0 }}>
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }}>
                    종목이 없습니다.
                  </Skeleton>
                </Grid>
              ) : (
                Object.entries(ma20).map((item) => {
                  console.log(item);
                  return (
                    <Grid key={item[1].code} item xs={12} md={12} sx={{ p: 0 }}>
                      <BigPieGridItem2 itemCode={item[1].code} itemName={item[1].name} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </ContainerWithoutLPadding>
        </Grid>
        <Grid item xs={6} md={3}>
          <ContainerWithoutLPadding>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                ) : (
                  <BigPieMovingAverageTitle movingAverage="40" />
                )}
              </Grid>
              {list.length === 0 ? (
                <>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ p: 0 }}>
                    <Skeleton width="100%" height="7rem" variant="rectangular" sx={{ borderRadius: 2 }} />
                  </Grid>
                </>
              ) : !ma40 ? (
                <Grid item xs={12} md={12} sx={{ p: 0 }}>
                  <Skeleton width="100%" height="5rem" variant="rectangular" sx={{ borderRadius: 2 }}>
                    종목이 없습니다.
                  </Skeleton>
                </Grid>
              ) : (
                Object.entries(ma40).map((item) => {
                  console.log(item);
                  return (
                    <Grid key={item[1].code} item xs={12} md={12} sx={{ p: 0 }}>
                      <BigPieGridItem2 itemCode={item[1].code} itemName={item[1].name} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          </ContainerWithoutLPadding>
        </Grid>
      </Grid>
    </ContainerWithoutLPadding>
    // </Container>
  );
}
