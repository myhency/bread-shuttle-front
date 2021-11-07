import PropTypes from 'prop-types';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import BigPieInstructionPopover from '../../../layouts/dashboard/BigPieInstructionPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('xs')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

BigPieGridTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  message: PropTypes.string
};

export default function BigPieGridTitle({ title, subtitle, message }) {
  const theme = useTheme();

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800'
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <Typography variant="h5" sx={{ color: theme.palette.primary.darker }}>
          {!title ? '...' : title}
        </Typography>
        {/* <Typography variant="caption" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {message}
        </Typography> */}
      </CardContent>
      <BigPieInstructionPopover subtitle={subtitle} message={message} />
    </RootStyle>
  );
}
