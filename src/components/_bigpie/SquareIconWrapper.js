import PropTypes from 'prop-types';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 64,
  height: 32,
  display: 'flex',
  borderRadius: '15%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.dark,
  backgroundColor: alpha(theme.palette.primary.dark, 0.16)
}));

const PERCENT = 0;

SquareIconWrapper.prototypes = {
  text: PropTypes.string
};

export default function SquareIconWrapper({ text }) {
  const theme = useTheme();

  return (
    <IconWrapperStyle
      sx={{
        ...(PERCENT < 0 && {
          color: 'error.main',
          bgcolor: alpha(theme.palette.error.main, 0.16)
        })
      }}
    >
      <Typography variant="h6">{!text ? '?' : text}</Typography>
    </IconWrapperStyle>
  );
}
