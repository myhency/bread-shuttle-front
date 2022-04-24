import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton, DesktopDatePicker } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Autocomplete, Button, Paper, Chip, Typography } from '@mui/material';
// utils
import fakeRequest from '../../../utils/fakeRequest';
import { fDateStringFormat } from '../../../utils/formatTime';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// redux
import { createSevenBreadItem, fetchSevenBreadItemByItemCode } from '../../../redux/slices/sevenBread';
import { useDispatch, useSelector } from '../../../redux/store';
import { Label } from './Block';

// ----------------------------------------------------------------------

SevenBreadNewForm.propTypes = {
  isEdit: PropTypes.bool,
  stockItemList: PropTypes.array,
  itemCode: PropTypes.string
};

const handlers = [
  { title: '기관', value: 'G' },
  { title: '외인', value: 'W' },
  { title: '기관/외인', value: 'B' }
];

const style = {
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  width: '100%',
  minHeight: '80px',
  // flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

export default function SevenBreadNewForm({ isEdit, stockItemList, itemCode }) {
  const dispatch = useDispatch();
  const { sevenBreadAdminItemByItemCode } = useSelector((state) => state.sevenBread);
  const [value, setValue] = useState('');
  const [revalue, setReValue] = useState('');
  const [reoccurDateList, setReoccurDateList] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchSevenBreadItemByItemCode(itemCode));
    }
  }, []);

  useEffect(() => {
    setReoccurDateList(
      sevenBreadAdminItemByItemCode.reOccurDateList.map((date) => {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        return `${year}-${month}-${day}`;
      })
    );
  }, [sevenBreadAdminItemByItemCode]);

  const NewSevenBreadItemSchema = Yup.object().shape({
    itemCode: Yup.string().required('종목명은 필수 항목입니다.'),
    majorHandler: Yup.string().required('수급주체를 선택해 주세요.'),
    capturedDate: Yup.string().required('기준일을 선택해 주세요.').nullable(true)
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: !isEdit
      ? {
          itemCode: '',
          itemName: '',
          majorHandler: '',
          capturedDate: ''
        }
      : {
          ...sevenBreadAdminItemByItemCode,
          reoccurDate: ''
        },
    validationSchema: NewSevenBreadItemSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const params = !isEdit
        ? {
            itemCode: values.itemCode,
            capturedDate: fDateStringFormat(values.capturedDate),
            majorHandler: values.majorHandler
          }
        : {
            itemCode: values.itemCode,
            capturedDate: fDateStringFormat(values.capturedDate),
            majorHandler: values.majorHandler,
            reoccurDateList
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
                        navigate(`${PATH_ADMIN.sevenBread.root}/${values.itemCode}/edit`);
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

  const handleOnDelete = (date) => {
    const modifiedList = reoccurDateList.map((item) => item).filter((item) => item !== date);
    setReoccurDateList(modifiedList);
  };

  const { values, errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const defaultValue = stockItemList.filter((item) => item.itemCode === values.itemCode);
  const defaultHandlers = handlers.filter((handler) => handler.value === values.majorHandler);
  const filteredReoccurDateList = [...new Set(reoccurDateList)]; // this removes duplicates

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
                    value={defaultValue[0] || null}
                    getOptionLabel={(stockItem) => (stockItem.itemName ? stockItem.itemName : '')}
                    // defaultValue={defaultValue[0] || null}
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
                    value={isEdit ? values.capturedDate : value}
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
                    value={defaultHandlers[0] || null}
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
                {isEdit && (
                  <>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                      sx={{ alignItems: 'center' }}
                    >
                      <DesktopDatePicker
                        value={revalue}
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        minDate={new Date('2017-01-01')}
                        onChange={(newValue) => {
                          setReValue(newValue);
                          // eslint-disable-next-line prefer-const
                          let dateList = filteredReoccurDateList.map((item) => item);
                          dateList.push(fDateStringFormat(newValue));
                          setReoccurDateList(dateList);
                          setFieldValue('reoccurDate', newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="재등장일을 선택하세요"
                            margin="normal"
                            sx={{ my: 0 }}
                            {...getFieldProps('reoccurDate')}
                            error={Boolean(touched.reoccurDate && errors.reoccurDate)}
                            helperText={touched.reoccurDate && errors.reoccurDate}
                          />
                        )}
                      />
                    </Stack>

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                      sx={{ alignItems: 'center' }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Label title="재등장일" />
                        <Paper variant="outlined" sx={style}>
                          {reoccurDateList.length > 0 &&
                            reoccurDateList.map((date) => (
                              // eslint-disable-next-line react/jsx-key
                              <Chip key={date} label={date} color="primary" onDelete={() => handleOnDelete(date)} />
                            ))}
                          {reoccurDateList.length === 0 && (
                            <Typography variant="body2">
                              재등장 이력이 없습니다. 재등장인 경우 재등장일을 선택하여 추가해 주세요.
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    </Stack>
                  </>
                )}

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
