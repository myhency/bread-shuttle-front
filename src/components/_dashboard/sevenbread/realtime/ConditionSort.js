import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { sortBySevenBreadItems } from '../../../../redux/slices/sevenBread';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'earningRateDesc', label: '수익률 순' },
  { value: 'detectedTimeDesc', label: '포착시간 순' },
  { value: 'ascentRateTodayDest', label: '금일 상승률 순' },
  { value: 'detectedDateDesc', label: '포착일 순' }
];

function renderLabel(label) {
  if (label === 'earningRateDesc') {
    return '수익률 순';
  }
  if (label === 'detectedTimeDesc') {
    return '포착시간 순';
  }
  if (label === 'ascentRateTodayDest') {
    return '금일 상승률 순';
  }
  return '포착일 순';
}

export default function ConditionSort() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const { sortBy } = useSelector((state) => state.sevenBread);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value) => {
    handleClose();
    dispatch(sortBySevenBreadItems(value));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
