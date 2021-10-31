// material
import { Container, Grid } from '@mui/material';
// hooks
import { useEffect } from 'react';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceTotalBalance,
  EcommerceSaleByGender,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance
} from '../../components/_dashboard/general-ecommerce';
import { BigPieGridTitle, BigPieGridSubTitle, BigPieGridItem1 } from '../../components/_dashboard/general-bigpie';
import useFirebaseRealtime from '../../hooks/useFirebase';

// ----------------------------------------------------------------------

export default function BigPieRealTime() {
  const { themeStretch } = useSettings();
  const { snapshots, loading, error } = useFirebaseRealtime();
  useEffect(() => {
    try {
      snapshots.forEach((v) => console.log(v.val()));
      console.log(loading);
    } catch (error) {
      console.log(error);
    }
  }, [snapshots]);

  return (
    <Page title="빅파이 실시간 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <BigPieGridTitle
                    title="단타용"
                    subtitle="바로 매수 가능"
                    message="(장중 단타가능, 스윙가능) 매도호가가 매수호가보다 많고 (호가창 강의 필수시청) 체결강도가 높은 종목이 실시간으로 노출됩니다."
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                    createdAt="09:08:32"
                    updatedAt="11:13:28"
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} md={9}>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <BigPieGridTitle
                    title="스윙용"
                    subtitle="15시부근 매수해서 3일 유지"
                    message="(스윙가능) 유통주식 상위종목+빅파이+마카롱에 떴었으나 현재는 마카롱조건에 해당되지 않는 종목이 노출됩니다. 오늘의 검색 종목에 표시되어있고 5%가 넘지 않았다면 15:00부근 종가매수가 가능합니다."
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <BigPieGridItem1
                    movingAverage={5}
                    itemCode="005930"
                    itemName="삼성전자"
                    fluctuationRate={-1.27}
                    closingPrice={69800}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// <Page title="빅파이 실시간 | 클라우드의 주식훈련소">
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
//           title="단타용"
//           subtitle="바로 매수 가능"
//           message="(장중 단타가능, 스윙가능) 매도호가가 매수호가보다 많고 (호가창 강의 필수시청) 체결강도가 높은 종목이 실시간으로 노출됩니다."
//         />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={12}>
//             <BigPieGridItem1
//               movingAverage={5}
//               itemCode="005930"
//               itemName="삼성전자"
//               fluctuationRate={-1.27}
//               closingPrice={69800}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} md={9}>
//         <BigPieGridTitle
//           title="스윙용"
//           subtitle="15시부근 매수해서 3일 유지"
//           message="(스윙가능) 유통주식 상위종목+빅파이+마카롱에 떴었으나 현재는 마카롱조건에 해당되지 않는 종목이 노출됩니다. 오늘의 검색 종목에 표시되어있고 5%가 넘지 않았다면 15:00부근 종가매수가 가능합니다."
//         />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={3}>
//             <BigPieGridItem1
//               movingAverage={5}
//               itemCode="005930"
//               itemName="삼성전자"
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
//             itemName="삼성전자"
//             fluctuationRate={-1.27}
//             closingPrice={69800}
//           />
//         </Grid>
//         <Grid item xs={6} md={3}>
//           <BigPieGridItem1
//             movingAverage={5}
//             itemCode="005930"
//             itemName="삼성전자"
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
