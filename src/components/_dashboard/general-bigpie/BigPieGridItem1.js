import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
import { fTimeShorten } from '../../../utils/formatTime';
//
import CircleIconWrapper from './CircleIconWrapper';

import { path, PATH_ALPHA_LINK, PATH_FN_LINK, PATH_NAVER_LINK } from '../../../routes/paths';

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

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CircleIconWrapper text={movingAverage} />
            <Typography variant="button">{itemName}</Typography>
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
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: theme.palette.primary.darker }}>
              {!updatedAt ? '-' : `최근 : ${fTimeShorten(updatedAt)}`}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.primary.darker }}>
              {!createdAt ? '-' : `최초 : ${fTimeShorten(createdAt)}`}&nbsp;
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }} spacing={1}>
            <Box
              component="img"
              src="https://m.alphasquare.co.kr/img/icons/apple-touch-icon-57x57.png"
              sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
              onClick={() => window.open(path(PATH_ALPHA_LINK, itemCode))}
            />
            <Box
              component="img"
              src="https://www.naver.com/favicon.ico?1"
              sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
              onClick={() => window.open(path(PATH_NAVER_LINK, itemCode))}
            />
            <Box
              component="img"
              src="https://www.fnguide.com/Content/images/favicon.ico?v=2"
              sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
              onClick={() => window.open(path(PATH_FN_LINK, itemCode))}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
