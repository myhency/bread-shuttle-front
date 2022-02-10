import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
// utils
import getColorName from '../../../utils/getColorName';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled((props) => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

function labelPriceRange(range) {
  if (range === 'below') {
    return 'Below $25';
  }
  if (range === 'between') {
    return 'Between $25 - $75';
  }
  return 'Above $75';
}

ConditionFiltered.propTypes = {
  formik: PropTypes.object,
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func
};

export default function ConditionFiltered({ formik, filters, isShowReset, isDefault, onResetFilter }) {
  const theme = useTheme();
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { price } = filters;
  // const isShow = values !== initialValues && !isShowReset;
  const isShow = false;

  const handleRemovePrice = () => {
    // handleSubmit();
    // setFieldValue('price', '');
  };

  return (
    <RootStyle>
      {price && (
        <WrapperStyle>
          <LabelStyle>조건검색:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={price} onDelete={handleRemovePrice} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
