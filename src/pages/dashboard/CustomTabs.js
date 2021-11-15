/* eslint-disable prefer-const */
import { capitalCase } from 'change-case';
import { Suspense, lazy, useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Grid, Skeleton } from '@mui/material';
// redux
import { random, sample } from 'lodash';
import { useDispatch, useSelector } from '../../redux/store';
import { getPosts, getGallery, getFriends, getProfile, getFollowers, onToggleFollow } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ListCover, BigPieDaily, BigPieGridTitle, BigPieGridSubTitle, BigPieGridItem1 } from '../../components/_bigpie';
import mockData from '../../utils/mock-data';
import useFirebaseRealtime from '../../hooks/useFirebase';
import { fDateKr } from '../../utils/formatTime';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3)
  }
}));

const CustomTabs = ({ PROFILE_TABS, currentTab, handleChangeTab }) => {
  if (!PROFILE_TABS[0].value === '' || currentTab === '') return null;
  return (
    <TabsWrapperStyle>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {PROFILE_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.value} />
        ))}
      </Tabs>
    </TabsWrapperStyle>
  );
};

export default CustomTabs;
