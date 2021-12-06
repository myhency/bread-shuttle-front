import PropTypes from 'prop-types';
// material
// import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography, Stack } from '@mui/material';
import { path, PATH_ALPHA_LINK, PATH_FN_LINK, PATH_NAVER_LINK, PATH_HANKYUNG_LINK } from '../../routes/paths';
import IconLinkBox from '../_share/IconLinkBox';

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
            <IconLinkBox itemCode={itemCode} itemName={itemName} />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
