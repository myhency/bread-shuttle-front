import PropTypes from 'prop-types';
// material
// import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
import { path, PATH_ALPHA_LINK, PATH_FN_LINK, PATH_NAVER_LINK } from '../../../routes/paths';

BigPieGridItem2.propTypes = {
  itemCode: PropTypes.string,
  itemName: PropTypes.string
};

export default function BigPieGridItem2({ itemCode, itemName }) {
  // const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
            <Typography variant="button">{itemName}</Typography>
            <Typography variant="body2">({itemCode})</Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} spacing={1}>
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
