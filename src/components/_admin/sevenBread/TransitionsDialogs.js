import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
// material
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  Stack
} from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';

// ----------------------------------------------------------------------

TransitionsDialogs.propTypes = {
  openDeleteDialog: PropTypes.bool,
  handleDeleteDialogClose: PropTypes.func
};

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function TransitionsDialogs({ openDeleteDialog, handleDeleteDialogClose }) {
  const [value, setValue] = useState(new Date());

  const handleClose = (type) => {
    handleDeleteDialogClose(type);
  };

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">종목을 삭제합니다.</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            종목을 삭제하면 해당 종목의 실시간 감시를 할 수 없습니다. <br />
            15% 이상 달성 종목은 통계수집이 계속됩니다.
          </DialogContentText>
          <Stack direction="column" flexWrap="wrap" alignItems="left" justifyContent="space-between" sx={{ my: 3 }}>
            <Typography component="span" variant="subtitle1">
              발생일을 입력해 주세요.
            </Typography>
            <DesktopDatePicker
              textFieldStyle={{ width: '20%' }}
              label="날짜를 선택하세요"
              value={value}
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              minDate={new Date('2017-01-01')}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} margin="normal" />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => handleClose('massiveSold')}>
            대량매도
          </Button>
          <Button color="inherit" onClick={() => handleClose('lossCut')}>
            기준일 저가 이탈
          </Button>
          <Button variant="contained" onClick={() => handleClose('win')}>
            15% 이상 달성
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
