import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// material
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';

BigPieInstructionPopover.propTypes = {
  subtitle: PropTypes.string,
  message: PropTypes.string
};

export default function BigPieInstructionPopover({ subtitle, message }) {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <HelpIcon sx={{ color: theme.palette.primary.darker }} />
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 300 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {subtitle}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {message}
          </Typography>
        </Box>
      </MenuPopover>
    </>
  );
}
