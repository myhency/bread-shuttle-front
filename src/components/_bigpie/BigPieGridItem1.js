import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../utils/formatNumber';
import { fTimeShorten } from '../../utils/formatTime';
// components
import CircleIconWrapper from './CircleIconWrapper';
import IconLinkBox from '../_share/IconLinkBox';

import { path, PATH_ALPHA_LINK, PATH_FN_LINK, PATH_NAVER_LINK, PATH_HANKYUNG_LINK } from '../../routes/paths';

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
            <IconLinkBox itemName={itemName} itemCode={itemCode} />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
