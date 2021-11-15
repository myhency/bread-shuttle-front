import PropTypes from 'prop-types';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import BigPieInstructionPopover from '../../layouts/dashboard/BigPieInstructionPopover';
import CircleIconWrapper from './CircleIconWrapper';

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

BigPieMovingAverageTitle.propTypes = {
  movingAverage: PropTypes.string
};

export default function BigPieMovingAverageTitle({ movingAverage }) {
  const theme = useTheme();

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1
        }}
      >
        <CircleIconWrapper text={movingAverage} />
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.dark
          }}
        >
          일선
        </Typography>
      </CardContent>
    </RootStyle>
  );
}
