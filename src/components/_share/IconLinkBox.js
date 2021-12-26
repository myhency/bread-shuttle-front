import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import {
  path,
  PATH_ALPHA_LINK,
  PATH_FN_LINK,
  PATH_NAVER_LINK,
  PATH_HANKYUNG_LINK,
  PATH_GOOGLE_NEWS_LINK
} from '../../routes/paths';

IconLinkBox.propTypes = {
  itemCode: PropTypes.string,
  itemName: PropTypes.string
};

export default function IconLinkBox({ itemCode, itemName }) {
  return (
    <>
      <Box
        component="img"
        src="https://m.alphasquare.co.kr/img/icons/apple-touch-icon-57x57.png"
        sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
        onClick={() => window.open(path(PATH_ALPHA_LINK, itemCode))}
      />
      <Box
        component="img"
        src="https://www.naver.com/favicon.ico?1"
        sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
        onClick={() => window.open(path(PATH_NAVER_LINK, itemCode))}
      />
      <Box
        component="img"
        src="http://consensus.hankyung.com/images/btn_attached.gif"
        sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
        onClick={() => window.open(PATH_HANKYUNG_LINK(itemName))}
      />
      <Box
        component="img"
        src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
        sx={{ cursor: 'pointer', height: 21, width: 21, borderRadius: 0.5, ml: 0.2, mr: 0.2 }}
        onClick={() => window.open(PATH_GOOGLE_NEWS_LINK(itemName))}
      />
    </>
  );
}
