import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
// material
import { Card, Stack, Container, Typography, TextField, Box, Paper, Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
// redux
import ThemeCategoryTreemap from '../../components/_trading-volume/ThemeCategoryTreemap';
import { useDispatch, useSelector } from '../../redux/store';
import {
  fetchTradingVolumeDateList,
  fetchThemeCategoryByDate,
  fetchThemeCategoryItemsByCategoryName
} from '../../redux/slices/tradingVolume';
// routes
import { path, PATH_ALPHA_LINK, PATH_M_ALPHA_LINK, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// utils
import { fDateStringFormat } from '../../utils/formatTime';

const ItemTable = ({ data, title }) => {
  const subtitle = title !== '' ? `(${title})` : title;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
        py={0.5}
        key="header"
      >
        <Typography variant="subtitle2">{`테마별 종목 리스트 ${subtitle}`}</Typography>
      </Box>
      {data.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="subtitle2" textAlign="center" height={585} sx={{ p: 10 }}>
            테마 영역을 클릭하세요.
          </Typography>
        </Box>
      )}
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
                {theme}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

const getOthers = (volumeData) => {
  const volumeBy = Math.round((volumeData.volume / (volumeData.numberOfOutstandingShares * 1000)) * 100 * 100) / 100;
  const amount = Math.round((volumeData.volume * volumeData.closingPrice) / 100000000);
  const chartLink = path(PATH_ALPHA_LINK, volumeData.itemCode);
  const mChartLink = path(PATH_M_ALPHA_LINK, volumeData.itemCode);
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

export default function TradingVolumeTheme() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(new Date('2021-09-17'));
  const [categoryName, setCategoryName] = useState('');
  const isSM = useMediaQuery({
    query: '(max-width: 600px)'
  });
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const { tradingVolumeDateList, themeCategoryByDate, themeCategoryItemsByCategoryName, isLoading } = useSelector(
    (state) => state.tradingVolume
  );

  const isDefault = tradingVolumeDateList.length === 0;

  useEffect(() => {
    dispatch(fetchTradingVolumeDateList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchThemeCategoryByDate(fDateStringFormat(value)));
  }, [value]);

  useEffect(() => {
    const newArr = themeCategoryByDate.map((item) => ({
      x: item.categoryName,
      y: item.count
    }));
    console.log(newArr);
    setChartData(newArr);
  }, [themeCategoryByDate]);

  useEffect(() => {
    console.log(themeCategoryItemsByCategoryName);
  }, [themeCategoryItemsByCategoryName]);

  const chartHeight = isSM ? 300 : 600;

  const handleChartOnClick = (e) => {
    setCategoryName(e.x);
    dispatch(
      fetchThemeCategoryItemsByCategoryName({
        categoryName: e.x,
        dateStr: fDateStringFormat(value)
      })
    );
  };

  return (
    <Page title="유통주식수대비 거래량 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="날짜별 주도 테마"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.tradingVolume },
            { name: '유통주식수대비 거래량', href: PATH_DASHBOARD.tradingVolume.root },
            { name: '날짜별 주도 테마' }
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
          <DesktopDatePicker
            textFieldStyle={{ width: '20%' }}
            label="날짜를 선택하세요"
            value={value}
            inputFormat="yyyy-MM-dd"
            mask="____-__-__"
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin="normal" />}
          />
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <ThemeCategoryTreemap data={chartData} height={chartHeight} onAreaClick={handleChartOnClick} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box>
                <ItemTable data={themeCategoryItemsByCategoryName} title={categoryName} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}