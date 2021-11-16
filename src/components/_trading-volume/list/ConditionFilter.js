import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { sortBySevenBreadItems } from '../../../redux/slices/sevenBread';

// ----------------------------------------------------------------------

const FILTER_BY_OPTIONS = [
  { value: 'itemName', label: '종목명' },
  { value: 'theme', label: '테마' }
];

function renderLabel(label) {
  if (label === 'itemName') {
    return '종목명';
  }
  if (label === 'theme') {
    return '테마';
  }
  return null;
}

export default function ConditionFilter() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const { filterBy } = useSelector((state) => state.tradingVolume);

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
        검색조건:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(filterBy)}
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
        {FILTER_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === filterBy}
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
