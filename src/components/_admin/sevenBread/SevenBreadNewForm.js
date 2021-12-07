import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton, DesktopDatePicker } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Autocomplete, Button } from '@mui/material';
// utils
import fakeRequest from '../../../utils/fakeRequest';
import { fDateStringFormat } from '../../../utils/formatTime';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// redux
import { createSevenBreadItem } from '../../../redux/slices/sevenBread';
import { useDispatch, useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

SevenBreadNewForm.propTypes = {
  isEdit: PropTypes.bool,
  stockItemList: PropTypes.array
};

const handlers = [
  { title: '기관', value: 'G' },
  { title: '외인', value: 'W' },
  { title: '기관/외인', value: 'B' }
];

export default function SevenBreadNewForm({ isEdit, stockItemList }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const NewSevenBreadItemSchema = Yup.object().shape({
    itemCode: Yup.string().required('종목명은 필수 항목입니다.'),
    majorHandler: Yup.string().required('수급주체를 선택해 주세요.'),
    capturedDate: Yup.string().required('기준일을 선택해 주세요.').nullable(true)
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemCode: '',
      itemName: '',
      majorHandler: '',
      capturedDate: ''
    },
    validationSchema: NewSevenBreadItemSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const params = {
        itemCode: values.itemCode,
        capturedDate: fDateStringFormat(values.capturedDate),
        majorHandler: values.majorHandler
      };
      createSevenBreadItem(params)
        .then((res) => {
          if (res) {
            resetForm();
            setSubmitting(false);
            enqueueSnackbar(
              !isEdit
                ? `${values.itemName}(${values.itemCode}) 추가 완료`
                : `${values.itemName}(${values.itemCode}) 수정 완료`,
              {
                variant: 'success'
              }
            );
            navigate(PATH_ADMIN.sevenBread.root);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.status === 409) {
            enqueueSnackbar(
              !isEdit
                ? `${values.itemName}(${values.itemCode})는 이미 추가된 종목입니다. 수정하시겠습니까?`
                : `${values.itemName}(${values.itemCode}) 수정 실패 : ${error?.message}`,
              {
                variant: 'info',
                persist: true,
                action: (key) => (
                  <>
                    <Button
                      onClick={() => {
                        closeSnackbar(key);
                      }}
                    >
                      {' '}
                      Edit{' '}
                    </Button>
                    <Button
                      onClick={() => {
                        closeSnackbar(key);
                      }}
                    >
                      {' '}
                      Close{' '}
                    </Button>
                  </>
                )
              }
            );
          } else {
            enqueueSnackbar('시스템 오류', {
              variant: 'error',
              persist: true,
              action: (key) => (
                <Button
                  onClick={() => {
                    closeSnackbar(key);
                  }}
                >
                  {' '}
                  Close{' '}
                </Button>
              )
            });
          }

          setSubmitting(false);
          setErrors(error);
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    fullWidth
                    options={stockItemList}
                    getOptionLabel={(stockItem) => stockItem.itemName}
                    onChange={(e, value) => {
                      setFieldValue('itemCode', value?.itemCode || '');
                      setFieldValue('itemName', value?.itemName || '');
                    }}
                    includeInputInList
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="itemCode"
                        label="종목명"
                        placeholder="종목명"
                        {...getFieldProps('itemCode')}
                        error={Boolean(touched.itemCode && errors.itemCode)}
                        helperText={touched.itemCode && errors.itemCode}
                      />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ alignItems: 'center' }}>
                  <DesktopDatePicker
                    value={value}
                    inputFormat="yyyy-MM-dd"
                    mask="____-__-__"
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setFieldValue('capturedDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="기준일을 선택하세요"
                        margin="normal"
                        sx={{ my: 0 }}
                        {...getFieldProps('capturedDate')}
                        error={Boolean(touched.capturedDate && errors.capturedDate)}
                        helperText={touched.capturedDate && errors.capturedDate}
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    options={handlers}
                    getOptionLabel={(handler) => handler.title}
                    onChange={(e, value) => {
                      setFieldValue('majorHandler', value?.value || '');
                    }}
                    includeInputInList
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="majorHandler"
                        label="수급주체"
                        placeholder="수급주체"
                        {...getFieldProps('majorHandler')}
                        error={Boolean(touched.majorHandler && errors.majorHandler)}
                        helperText={touched.majorHandler && errors.majorHandler}
                      />
                    )}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? '종목추가' : '종목수정'}
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
