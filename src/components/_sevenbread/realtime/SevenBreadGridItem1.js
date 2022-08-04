/* eslint-disable jsx-a11y/accessible-emoji */
import PropTypes from 'prop-types';
// material
import { useTheme, styled, alpha } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
//
import IconLinkBox from '../../_share/IconLinkBox';

const TextIconStyle = styled(Typography)(({ theme }) => ({
  padding: '4px',
  borderRadius: '20%',
  backgroundColor: alpha(theme.palette.primary.light, 0.16)
}));

SevenBreadGridItem1.propTypes = {
  itemCode: PropTypes.string,
  itemName: PropTypes.string,
  majorHandler: PropTypes.string,
  presentPrice: PropTypes.number,
  fluctuationRate: PropTypes.number,
  capturedPrice: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  closingPrice: PropTypes.number
};

export default function SevenBreadGridItem1({
  itemCode,
  itemName,
  majorHandler,
  presentPrice,
  capturedPrice,
  fluctuationRateBy,
  fluctuationRate,
  capturedDate,
  alarmedTime
}) {
  const theme = useTheme();
  // eslint-disable-next-line no-nested-ternary
  const icon = majorHandler === 'G' ? '기' : majorHandler === 'W' ? '외' : null;
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {icon ? (
              <Box>
                <TextIconStyle variant="button">{icon}</TextIconStyle>
              </Box>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <TextIconStyle variant="button">기/외</TextIconStyle>
              </Box>
            )}

            <Typography variant="button">{itemName}</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            {/* <Typography
              variant="subtitle2"
              sx={{ color: fluctuationRate < 0 ? theme.palette.info.dark : theme.palette.error.dark, ml: 0.5 }}
            >
              ({fPercent(fluctuationRate)})
            </Typography> */}
            <Typography variant="subtitle2">{fNumber(presentPrice)}</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: theme.palette.common }}>
              포착일 종가(원/대비)
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.common }}>
              포착일
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="button" sx={{ color: theme.palette.common }}>
                {fNumber(capturedPrice)}/
              </Typography>
              <Typography
                variant="button"
                sx={{ color: fluctuationRateBy < 0 ? theme.palette.info.dark : theme.palette.error.dark, ml: 0.5 }}
              >
                ({fPercent(fluctuationRateBy)})
              </Typography>
            </Box>
            <Typography variant="button" sx={{ color: theme.palette.common }}>
              {String(capturedDate).substr(0, 10)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} spacing={1}>
            <IconLinkBox itemName={itemName} itemCode={itemCode} />
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'right' }}>
              <Typography variant="caption" sx={{ color: theme.palette.common }}>
                ⏲️ &nbsp;{alarmedTime}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
