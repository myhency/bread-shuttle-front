/* eslint-disable prefer-const */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, Tooltip, Typography, CardActionArea } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// routes
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import { useDispatch, useSelector } from '../../redux/store';
import { fetchLinks } from '../../redux/slices/link';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

// const AccountStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: theme.shape.borderRadiusSm,
//   backgroundColor: theme.palette.grey[500_12]
// }));

// ----------------------------------------------------------------------

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool
};

function IconCollapse({ onToggleCollapse, collapseClick }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0
            })
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { links, isLoading, error } = useSelector((state) => state.link);

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  let _sidebarConfig = sidebarConfig;

  if (links.length > 0) {
    _sidebarConfig
      .find((item) => item.subheader === 'Trade')
      .items.find((v) => v.title === '거래량상위추적')
      .children.find((v) => v.title === '변경사항').eLink = links.find((v) => v.linkName === 'bigpie').linkValue;
    _sidebarConfig
      .find((item) => item.subheader === 'links')
      .items.find((v) => v.title === '즐겨찾기')
      .children.find((v) => v.title === '이달의 텔레그램').eLink = links.find(
      (v) => v.linkName === 'telegram'
    ).linkValue;
  }

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
          </MHidden>
        </Stack>
      </Stack>

      <NavSection navConfig={_sidebarConfig} additionalLinks={links} isShow={!isCollapse} />

      {!isCollapse && (
        <Stack spacing={3} alignItems="center" sx={{ px: 5, pb: 5, mt: 5, width: 1, textAlign: 'center' }}>
          <div>
            <Typography gutterBottom variant="subtitle1">
              안녕하세요, {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`회원님의 사용종료일은 ${user.paymentEndDate} 입니다`}
            </Typography>
          </div>
        </Stack>
      )}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
