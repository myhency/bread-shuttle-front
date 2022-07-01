import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
// utils
import { useDispatch } from '../../../redux/store';
// routes
import { PATH_ADMIN } from '../../../routes/paths';

import { updateLink, fetchLinks } from '../../../redux/slices/link';

// ----------------------------------------------------------------------

LinkEditForm.propTypes = {
  currentLink: PropTypes.object
};

export default function LinkEditForm({ currentLink }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLinkSchema = Yup.object().shape({
    linkValue: Yup.string().required('링크를 입력해야 합니다.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      linkName: currentLink?.linkName || '',
      linkValue: currentLink?.linkValue || ''
    },
    validationSchema: NewLinkSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const { linkValue } = values;

        updateLink({
          id: currentLink.id,
          linkValue
        })
          .then((res) => {
            resetForm();
            setSubmitting(false);
            enqueueSnackbar('Update success', { variant: 'success' });
            dispatch(fetchLinks());
            navigate(PATH_ADMIN.admin.links);
          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
            setErrors(error);
            enqueueSnackbar('Update fail', { variant: 'error' });
          });
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setErrors(error);
        enqueueSnackbar('Update fail', { variant: 'error' });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
                    disabled
                    label="링크용도"
                    {...getFieldProps('linkName')}
                    error={Boolean(touched.linkName && errors.linkName)}
                    helperText={touched.linkName && errors.linkName}
                  />
                  <TextField
                    fullWidth
                    label="링크"
                    {...getFieldProps('linkValue')}
                    error={Boolean(touched.linkValue && errors.linkValue)}
                    helperText={touched.linkValue && errors.linkValue}
                  />
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    링크수정
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
