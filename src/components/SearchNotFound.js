import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        데이터 없음
      </Typography>
      <Typography variant="body2" align="center">
        데이터를 찾지 못했습니다.&nbsp;검색조건을 변경해 보세요.
      </Typography>
    </Paper>
  );
}
