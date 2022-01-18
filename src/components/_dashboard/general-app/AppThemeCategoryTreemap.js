import { Icon } from '@iconify/react';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
import ThemeCategoryTreemap from '../../_trading-volume/ThemeCategoryTreemap';
import useFirebaseRealtime from '../../../hooks/useFirebase';
import {
  fetchTradingVolumeDateList,
  fetchThemeCategoryByItemCodes,
  fetchThemeCategoryItemsByCategoryName
} from '../../../redux/slices/tradingVolume';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  [theme.breakpoints.up('md')]: {
    height: '100%'
    // display: 'flex',
    // textAlign: 'left',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  }
}));

export default function AppThemeCategoryTreemap() {
  const isSM = useMediaQuery({
    query: '(max-width: 600px)'
  });
  const dispatch = useDispatch();
  const { volumeRealTimeSnapshots, vLoading, vError } = useFirebaseRealtime();
  const [chartData, setChartData] = useState([]);
  const { tradingVolumeDateList, themeCategoryByItemCodes, themeCategoryItemsByCategoryName, error } = useSelector(
    (state) => state.tradingVolume
  );

  const chartHeight = isSM ? 300 : 400;

  useEffect(() => {
    try {
      const chartDataArr = [];
      volumeRealTimeSnapshots.forEach((v) => {
        chartDataArr.push(v.val().code);
        console.log(v.itemCodes);
      });
      console.log(chartDataArr);
      dispatch(fetchThemeCategoryByItemCodes(chartDataArr));
    } catch (error) {
      console.log(error);
    }
  }, [volumeRealTimeSnapshots]);

  useEffect(() => {
    if (!themeCategoryByItemCodes) {
      return;
    }
    const newArr = themeCategoryByItemCodes.map((item) => ({
      x: item.categoryName,
      y: item.count
    }));
    setChartData(newArr);
  }, [themeCategoryByItemCodes]);

  return (
    <Card sx={{ p: 3 }}>
      <ThemeCategoryTreemap
        data={chartData}
        height={chartHeight}
        title="실시간 주도 테마 TOP 20"
        onAreaClick={console.log}
      />
    </Card>
  );
}
