import PropTypes from 'prop-types';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <Typography gutterBottom variant="h4">
          환영합니다 😁
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          저희방의 컨셉은 ‘교육’입니다. 학습한걸 바탕으로 리딩 따라가는 방이니 아래 링크 필독하시고 참고하세요
        </Typography>

        <Button
          variant="contained"
          // to="https://www.evernote.com/shard/s744/sh/9aa341ce-aa60-4df2-8775-05786fe5a74b/4ebc31f61275f61c72e6cecfd3aacc79"
          // component={RouterLink}
          // target="_blank"
          // rel="noopener noreferrer"
          onClick={() =>
            window.open(
              'https://www.evernote.com/shard/s744/sh/9aa341ce-aa60-4df2-8775-05786fe5a74b/4ebc31f61275f61c72e6cecfd3aacc79',
              '_blank'
            )
          }
        >
          처음이신가요?
        </Button>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
