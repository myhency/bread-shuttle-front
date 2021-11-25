import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

export default function ThemeCategoryTreemap({ data, height, onAreaClick }) {
  const theme = useTheme();

  const CHART_DATA = [
    {
      data
    }
  ];

  const chartOptions = {
    legend: {
      show: true
    },
    chart: {
      id: 'tree',
      events: {
        click(event, _, config) {
          const el = event.target;
          if (el.tagName !== 'rect') return;
          const seriesIndex = parseInt(el.getAttribute('i'), 10);
          const dataPointIndex = parseInt(el.getAttribute('j'), 10);

          const seriesName = config.config.series[seriesIndex].data[dataPointIndex];
          onAreaClick(seriesName);
        }
      }
    },
    title: {
      text: '날짜별 주도 테마 TOP 20'
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px'
      },
      formatter(text, op) {
        return [text, op.value];
      },
      offsetY: -4
    },
    plotOptions: {
      treemap: {
        enableShades: false,
        shadeIntensity: 0.3,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 2,
              color: theme.palette.info.light
            },
            {
              from: 3,
              to: 5,
              color: theme.palette.error.light
            },
            {
              from: 6,
              to: 9,
              color: theme.palette.error.main
            },
            {
              from: 10,
              to: 20,
              color: theme.palette.error.dark
            }
          ]
        }
      }
    },
    grid: {
      padding: {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
      }
    }
  };

  return <ReactApexChart type="treemap" series={CHART_DATA} options={chartOptions} height={height} />;
}
