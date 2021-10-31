import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import emailFill from '@iconify/icons-eva/email-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Card, CardActions, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import CircleIconWrapper from './CircleIconWrapper';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

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

BigPieGridItem1.propTypes = {
  movingAverage: PropTypes.number,
  itemCode: PropTypes.string,
  itemName: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  fluctuationRate: PropTypes.number,
  closingPrice: PropTypes.number
};

export default function BigPieGridItem1({
  movingAverage,
  itemCode,
  itemName,
  createdAt,
  updatedAt,
  fluctuationRate,
  closingPrice
}) {
  const theme = useTheme();
  const alphaLink = `https://alphasquare.co.kr/home/stock/stock-summary?code=${itemCode}`;
  const fnLink = `http://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A${itemCode}`;
  const naverLink = `https://finance.naver.com/item/main.nhn?code=${itemCode}`;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CircleIconWrapper text={movingAverage} />
            <Typography variant="h6">{itemName}</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Typography
              variant="subtitle2"
              sx={{ color: fluctuationRate < 0 ? theme.palette.info.dark : theme.palette.error.dark, ml: 0.5 }}
            >
              ({fluctuationRate}%)
            </Typography>
            <Typography variant="subtitle2">{new Intl.NumberFormat('ko-KR').format(closingPrice)}</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Typography variant="caption" sx={{ color: theme.palette.primary.darker }}>
              / 최근 : {updatedAt}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.primary.darker }}>
              최초 : {createdAt}&nbsp;
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box component="img" src="/static/links/alpha.jpg" onClick={() => window.open(alphaLink)} />
            <Box component="img" src="/static/links/naver.jpg" onClick={() => window.open(naverLink)} />
            <Box component="img" src="/static/links/fn.jpg" onClick={() => window.open(fnLink)} />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
