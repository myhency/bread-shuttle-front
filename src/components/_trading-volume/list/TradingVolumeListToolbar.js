import PropTypes from 'prop-types';
import React, { useState } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Switch
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

TradingVolumeListToolbar.propTypes = {
  isKosdaq: PropTypes.bool,
  onChecked: PropTypes.func
};

export default function TradingVolumeListToolbar({ isKosdaq, onChecked }) {
  return (
    <RootStyle>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>코스피</Typography>
        <Switch checked={isKosdaq} onChange={onChecked} />
        <Typography>코스닥</Typography>
      </Box>
    </RootStyle>
  );
}
