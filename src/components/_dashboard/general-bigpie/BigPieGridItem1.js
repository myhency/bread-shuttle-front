import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
//
import CircleIconWrapper from './CircleIconWrapper';

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
              ({fPercent(fluctuationRate)})
            </Typography>
            <Typography variant="subtitle2">{fNumber(closingPrice)}</Typography>
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
            <Box
              component="img"
              src="/static/links/alpha.jpg"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(alphaLink)}
            />
            <Box
              component="img"
              src="/static/links/naver.jpg"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(naverLink)}
            />
            <Box
              component="img"
              src="/static/links/fn.jpg"
              sx={{ cursor: 'pointer' }}
              onClick={() => window.open(fnLink)}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
