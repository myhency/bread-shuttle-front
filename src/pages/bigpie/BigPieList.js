/* eslint-disable prefer-const */
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Grid } from '@mui/material';
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

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function BigPieList() {
  const { themeStretch } = useSettings();
  const { bigpieSnapshots, bLoading, bError } = useFirebaseRealtime();
  const [bigpieList, setBigpieList] = useState([]);
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (bLoading) {
      return () => {};
    }

    try {
      const arr = bigpieSnapshots.sort((a, b) => b.key - a.key);
      if (currentTab === '') setCurrentTab(fDateKr(arr[0].key));
      setBigpieList(arr);
    } catch (error) {
      console.log(error);
    }
  }, [bigpieSnapshots]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // console.log(bLoading ? '' : bigpieSnapshots[0].val());

  const PROFILE_TABS = bigpieList
    .sort((a, b) => b.key - a.key)
    .map((item) => ({
      value: fDateKr(item.key)
    }));

  return (
    <Page title="날짜별 빅파이 | 클라우드의 주식훈련소">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="날짜별 빅파이"
          links={[
            { name: 'TRADE', href: PATH_DASHBOARD.bigpie },
            { name: '빅파이', href: PATH_DASHBOARD.bigpie.realtime },
            { name: '날짜별 빅파이' }
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 240,
            position: 'relative'
          }}
        >
          <ListCover myProfile={{ cover: '' }} />

          {bLoading ? (
            <TabsWrapperStyle>
              <Tabs value="loadingTab" scrollButtons="auto" variant="scrollable" allowScrollButtonsMobile>
                <Tab disableRipple value="loadingTab" label="로딩중..." />
              </Tabs>
            </TabsWrapperStyle>
          ) : (
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
          )}
        </Card>
        <BigPieDaily
          loading={bLoading}
          date={currentTab}
          list={bigpieSnapshots.filter((item) => fDateKr(item.key) === currentTab)}
        />
      </Container>
    </Page>
  );
}
