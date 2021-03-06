// material
import { Container, Grid, Typography, Box } from '@mui/material';
import {
  styled
  // useTheme
} from '@mui/material/styles';
// hooks
import { useEffect, useState } from 'react';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  BigPieGridTitle,
  // BigPieGridSubTitle,
  BigPieGridItem1
} from '../../components/_bigpie';
import useFirebaseRealtime from '../../hooks/useFirebase';
import LoadingScreen from '../../components/LoadingScreen';

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

export default function BigPieRealTime() {
  const { themeStretch } = useSettings();
  const { todaySnapshots, tLoading, tError, macaronSnapshots, mLoading, mError } = useFirebaseRealtime();
  const [swingBigPie, setSwingBigPie] = useState([]);
  const [dayTradingBigPie, setDayTradingBigPie] = useState([]);

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

  return (
    <Page title="????????? ????????? | ??????????????? ???????????????">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid
          container
          spacing={1}
          // spacing={3}
        >
          <Grid item xs={6} md={3}>
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
          </Grid>
          <Grid item xs={6} md={9}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// <Page title="????????? ????????? | ??????????????? ???????????????">
//   <Container maxWidth={themeStretch ? false : 'xl'}>
//     <Grid container spacing={3}>
//       {/* <Grid item xs={12} md={8}>
//           <EcommerceWelcome />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <EcommerceNewProducts />
//         </Grid> */}

//       <Grid item xs={6} md={3}>
//         <BigPieGridTitle
//           title="?????????"
//           subtitle="?????? ?????? ??????"
//           message="(?????? ????????????, ????????????) ??????????????? ?????????????????? ?????? (????????? ?????? ????????????) ??????????????? ?????? ????????? ??????????????? ???????????????."
//         />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={12}>
//             <BigPieGridItem1
//               movingAverage={5}
//               itemCode="005930"
//               itemName="????????????"
//               fluctuationRate={-1.27}
//               closingPrice={69800}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} md={9}>
//         <BigPieGridTitle
//           title="?????????"
//           subtitle="15????????? ???????????? 3??? ??????"
//           message="(????????????) ???????????? ????????????+?????????+???????????? ???????????? ????????? ?????????????????? ???????????? ?????? ????????? ???????????????. ????????? ?????? ????????? ?????????????????? 5%??? ?????? ???????????? 15:00?????? ??????????????? ???????????????."
//         />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={3}>
//             <BigPieGridItem1
//               movingAverage={5}
//               itemCode="005930"
//               itemName="????????????"
//               fluctuationRate={-1.27}
//               closingPrice={69800}
//             />
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* <Grid item xs={6} md={3}>
//           <BigPieGridItem1
//             movingAverage={5}
//             itemCode="005930"
//             itemName="????????????"
//             fluctuationRate={-1.27}
//             closingPrice={69800}
//           />
//         </Grid>
//         <Grid item xs={6} md={3}>
//           <BigPieGridItem1
//             movingAverage={5}
//             itemCode="005930"
//             itemName="????????????"
//             fluctuationRate={-1.27}
//             closingPrice={69800}
//           />
//         </Grid> */}
//       {/* <Grid item xs={12} md={4}>
//           <EcommerceSalesProfit />
//         </Grid>

//         <Grid item xs={12} md={6} lg={4}>
//           <EcommerceSaleByGender />
//         </Grid>

//         <Grid item xs={12} md={6} lg={8}>
//           <EcommerceYearlySales />
//         </Grid>

//         <Grid item xs={12} md={6} lg={8}>
//           <EcommerceSalesOverview />
//         </Grid>

//         <Grid item xs={12} md={6} lg={4}>
//           <EcommerceCurrentBalance />
//         </Grid>

//         <Grid item xs={12} md={6} lg={8}>
//           <EcommerceBestSalesman />
//         </Grid>

//         <Grid item xs={12} md={6} lg={4}>
//           <EcommerceLatestProducts />
//         </Grid> */}
//     </Grid>
//   </Container>
// </Page>;
