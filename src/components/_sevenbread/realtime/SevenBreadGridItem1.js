/* eslint-disable jsx-a11y/accessible-emoji */
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Box, Typography, Stack, ListItemIcon, SvgIcon } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';
import { fTimeShorten, fDateStringFormat } from '../../../utils/formatTime';
//
import { path, PATH_ALPHA_LINK, PATH_FN_LINK, PATH_NAVER_LINK } from '../../../routes/paths';
import SvgIconStyle from '../../SvgIconStyle';

const getIcon = (name) => <SvgIconStyle src={`/static/icons/${name}.svg`} sx={{ width: '100%', height: '100%' }} />;

const ICONS = {
  building: getIcon('ic_building'),
  person: getIcon('ic_person1')
};

const ListItemIconStyle = styled(ListItemIcon)({
  width: 18,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

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
  const icon = majorHandler === 'G' ? ICONS.building : majorHandler === 'W' ? ICONS.person : null;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {icon ? (
              <Box>
                <ListItemIconStyle sx={{ mr: 1 }}>{icon}</ListItemIconStyle>
              </Box>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <ListItemIconStyle sx={{ mr: 1 }}>{ICONS.building}</ListItemIconStyle>
                <ListItemIconStyle sx={{ mr: 1 }}>{ICONS.person}</ListItemIconStyle>
              </Box>
            )}

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
              {fDateStringFormat(capturedDate)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} spacing={1}>
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
