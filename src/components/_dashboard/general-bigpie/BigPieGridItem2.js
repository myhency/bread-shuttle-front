import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';

BigPieGridItem2.propTypes = {
  itemCode: PropTypes.string,
  itemName: PropTypes.string
};

export default function BigPieGridItem2({ itemCode, itemName }) {
  const theme = useTheme();
  const alphaLink = `https://alphasquare.co.kr/home/stock/stock-summary?code=${itemCode}`;
  const fnLink = `http://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A${itemCode}`;
  const naverLink = `https://finance.naver.com/item/main.nhn?code=${itemCode}`;

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
              onClick={() => window.open(alphaLink)}
            />
            <Box
              component="img"
              src="https://www.naver.com/favicon.ico?1"
              sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
              onClick={() => window.open(naverLink)}
            />
            <Box
              component="img"
              src="https://www.fnguide.com/Content/images/favicon.ico?v=2"
              sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
              onClick={() => window.open(fnLink)}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
