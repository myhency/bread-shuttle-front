/* eslint-disable prefer-const */
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
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
import { ListCover } from '../../components/_dashboard/general-bigpie/list';
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
  const dispatch = useDispatch();
  // const { myProfile, posts, followers, friends, gallery } = useSelector((state) => state.user);
  const { myProfile, posts, followers, friends, gallery } = {
    id: mockData.id(1),
    cover: mockData.image.cover(1),
    position: 'UI Designer',
    follower: random(99999),
    following: random(99999),
    quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
    country: mockData.address.country(1),
    email: mockData.email(1),
    company: mockData.company(1),
    school: mockData.company(2),
    role: 'Manager',
    facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
    instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
    linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitterLink: `https://www.twitter.com/caitlyn.kerluke`
  };
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('');
  const [findFriends, setFindFriends] = useState('');

  // useEffect(() => {
  //   dispatch(getProfile());
  //   dispatch(getPosts());
  //   dispatch(getFollowers());
  //   dispatch(getFriends());
  //   dispatch(getGallery());
  // }, [dispatch]);

  useEffect(() => {
    // if (bigpieSnapshots.length === 0) return;
    try {
      const arr = bigpieSnapshots.sort((a, b) => b.key - a.key);
      console.log(fDateKr(arr[0].key));
      if (currentTab === '') setCurrentTab(fDateKr(arr[0].key));
      setBigpieList(arr);
    } catch (error) {
      console.log(error);
    }
  }, [bigpieSnapshots]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (event) => {
    setFindFriends(event.target.value);
  };

  // if (!myProfile) {
  //   return null;
  // }

  console.log(currentTab);

  // const PROFILE_TABS = [
  //   {
  //     value: '2021-10-29'
  //     // icon: <Icon icon={roundAccountBox} width={20} height={20} />
  //     // component: <Profile myProfile={myProfile} posts={posts} />
  //   },
  //   {
  //     value: '2021-10-28'
  //     // icon: <Icon icon={heartFill} width={20} height={20} />
  //     // component: <ProfileFollowers followers={followers} onToggleFollow={handleToggleFollow} />
  //   },
  //   {
  //     value: '2021-10-27'
  //     // icon: <Icon icon={peopleFill} width={20} height={20} />
  //     // component: <ProfileFriends friends={friends} findFriends={findFriends} onFindFriends={handleFindFriends} />
  //   }
  // ];

  const PROFILE_TABS =
    bigpieList.length === 0
      ? [
          {
            value: ''
          }
        ]
      : bigpieList
          .sort((a, b) => b.key - a.key)
          .map((item) => ({
            value: fDateKr(item.key)
            // component: <BigPieDailyList data={item.val()} />
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

          {!PROFILE_TABS[0].value === '' || currentTab === '' ? null : (
            <TabsWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={handleChangeTab}
              >
                {PROFILE_TABS.map((tab) => {
                  console.log(currentTab);
                  return <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.value} />;
                })}
              </Tabs>
            </TabsWrapperStyle>
          )}
        </Card>

        {/* {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })} */}
        <Box>{currentTab}</Box>
      </Container>
    </Page>
  );
}
