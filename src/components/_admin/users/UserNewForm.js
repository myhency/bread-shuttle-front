import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton, DesktopDatePicker } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, IconButton, InputAdornment, Autocomplete } from '@mui/material';
// utils
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { fDateStringFormat } from '../../../utils/formatTime';
import { useDispatch } from '../../../redux/store';
// routes
import { PATH_ADMIN } from '../../../routes/paths';

import { updateUser, createUser, getUserList } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

const handlers = [
  { title: '관리자', value: 'ROLE_ADMIN' },
  { title: '정회원', value: 'ROLE_USER' }
];

export default function UserNewForm({ isEdit, currentUser }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [paymentStartDate, setPaymentStartDate] = useState('');
  const [paymentEndDate, setPaymentEndDate] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required('ID를 입력해야 합니다.'),
    role: Yup.string().required('권한을 선택해야 합니다.')
    // password: Yup.string().required('패스워드를 입력하세요'),
    // paymentStartDate: Yup.string().required('권한을 선택해야 합니다.'),
    // paymentEndDate: Yup.string().required('권한을 선택해야 합니다.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: currentUser?.userName || '',
      role: currentUser?.role || '',
      paymentStartDate: currentUser?.paymentStartDate || '',
      paymentEndDate: currentUser?.paymentEndDate || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const { paymentEndDate, paymentStartDate } = values;

        console.log(values);
        if (isEdit) {
          dispatch(
            updateUser({
              id: currentUser.id,
              ...values,
              paymentEndDate: fDateStringFormat(paymentEndDate),
              paymentStartDate: fDateStringFormat(paymentStartDate)
            })
          );
          dispatch(getUserList());
        } else {
          dispatch(
            createUser({
              ...values,
              paymentEndDate: fDateStringFormat(paymentEndDate),
              paymentStartDate: fDateStringFormat(paymentStartDate)
            })
          );
          dispatch(getUserList());
        }

        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_ADMIN.admin.users);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const defaultHandlers = handlers.filter((handler) => handler.value === values.role);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  console.log(values);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={isEdit}
                    label="ID"
                    {...getFieldProps('userName')}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                  <Autocomplete
                    fullWidth
                    options={handlers}
                    value={defaultHandlers[0] || null}
                    getOptionLabel={(handler) => handler.title}
                    onChange={(e, value) => {
                      setFieldValue('role', value?.value || '');
                    }}
                    includeInputInList
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="role"
                        label="권한"
                        placeholder="권한"
                        {...getFieldProps('role')}
                        error={Boolean(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="패스워드를 입력하세요"
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <DesktopDatePicker
                    value={isEdit ? values.paymentStartDate : paymentStartDate}
                    inputFormat="yyyy-MM-dd"
                    mask="____-__-__"
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                      setPaymentStartDate(newValue);
                      setFieldValue('paymentStartDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="입금일을 선택하세요"
                        margin="normal"
                        sx={{ my: 0 }}
                        {...getFieldProps('paymentStartDate')}
                        error={Boolean(touched.paymentStartDate && errors.paymentStartDate)}
                        helperText={touched.paymentStartDate && errors.paymentStartDate}
                      />
                    )}
                  />
                  <DesktopDatePicker
                    // value={isEdit ? values.paymentEndDate : paymentEndDate}
                    value={isEdit ? values.paymentEndDate : paymentEndDate}
                    inputFormat="yyyy-MM-dd"
                    mask="____-__-__"
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                      setPaymentEndDate(newValue);
                      setFieldValue('paymentEndDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="사용종료일을 선택하세요"
                        margin="normal"
                        sx={{ my: 0 }}
                        {...getFieldProps('paymentEndDate')}
                        error={Boolean(touched.paymentEndDate && errors.paymentEndDate)}
                        helperText={touched.paymentEndDate && errors.paymentEndDate}
                      />
                    )}
                  />
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? '사용자추가' : '사용자수정'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
