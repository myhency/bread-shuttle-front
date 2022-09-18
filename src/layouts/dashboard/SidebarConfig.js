// routes
import {
  PATH_DASHBOARD,
  PATH_STOCK_CALENDAR,
  PATH_NAVER_ECONOMIC_NEWS,
  PATH_COMPANY_GUIDE,
  PATH_ADMIN,
  PATH_TODAY_REPORT,
  PATH_BREADSHUTTLE_MANUAL_LINK,
  PATH_SEVENBREAD_CHANGES,
  PATH_NEW_USER_LINK,
  PATH_BIGPIE_CHANGES,
  PATH_TELEGRAM_THIS_MONTH
} from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  bus: getIcon('ic_bus'),
  description: getIcon('ic_description'),
  telegram: getIcon('ic_telegram'),
  filter7: getIcon('ic_filter_7'),
  bookmarks: getIcon('ic_bookmarks'),
  viewlist: getIcon('ic_view_list'),
  info: getIcon('ic_info')
};

const sidebarConfig = [
  // 안내
  // ----------------------------------------------------------------------
  {
    isAdmin: false,
    subheader: 'intro',
    items: [
      {
        title: '안내',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.info,
        children: [
          { title: `Cloud's pick서비스 매뉴얼`, eLink: PATH_BREADSHUTTLE_MANUAL_LINK }
          // { title: '가입안내', eLink: PATH_NEW_USER_LINK }
        ]
      }
    ]
  },
  {
    isAdmin: false,
    subheader: 'Trade',
    items: [
      {
        title: '거래량상위추적',
        path: PATH_DASHBOARD.bigpie.root,
        icon: ICONS.bus,
        children: [
          { title: '변경사항', eLink: PATH_BIGPIE_CHANGES },
          { title: '실시간 현황', path: PATH_DASHBOARD.bigpie.realtime }
          // { title: '날짜별 조회', path: PATH_DASHBOARD.bigpie.list }
        ]
      },
      {
        title: '기관외인수급추적',
        path: PATH_DASHBOARD.sevenBread.root,
        icon: ICONS.filter7,
        children: [
          // { title: '변경사항', eLink: PATH_SEVENBREAD_CHANGES },
          { title: '실시간 현황', path: PATH_DASHBOARD.sevenBread.realtime },
          { title: '리스트 조회', path: PATH_DASHBOARD.sevenBread.list }
        ]
      },
      {
        title: '유통주식수대비 거래량',
        path: PATH_DASHBOARD.tradingVolume.root,
        icon: ICONS.viewlist,
        children: [
          { title: '날짜별 조회', path: PATH_DASHBOARD.tradingVolume.list },
          { title: '날짜별 주도 테마', path: PATH_DASHBOARD.tradingVolume.theme },
          { title: '통합검색', path: PATH_DASHBOARD.tradingVolume.search }
        ]
      }
    ]
  },

  // 즐겨찾기
  // ----------------------------------------------------------------------
  {
    isAdmin: false,
    subheader: 'links',
    items: [
      {
        title: '즐겨찾기',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.bookmarks,
        children: [
          { title: '오늘의 리포트', eLink: PATH_TODAY_REPORT },
          { title: '증시스케줄', eLink: PATH_STOCK_CALENDAR },
          { title: '네이버 경제뉴스', eLink: PATH_NAVER_ECONOMIC_NEWS },
          { title: '증자분할 달력', eLink: PATH_COMPANY_GUIDE },
          { title: '이달의 텔레그램', eLink: PATH_TELEGRAM_THIS_MONTH }
        ]
      }
    ]
  },

  // Admin
  // ----------------------------------------------------------------------
  {
    isAdmin: true,
    subheader: 'admin',
    items: [
      {
        title: '기관외인수급추적',
        path: PATH_ADMIN.sevenBread.root,
        icon: ICONS.filter7,
        children: [
          { title: '종목관리', path: PATH_ADMIN.sevenBread.management },
          { title: '종목추가', path: PATH_ADMIN.sevenBread.newItem }
        ]
      },
      {
        title: '관리자전용',
        path: PATH_ADMIN.admin.root,
        icon: ICONS.user,
        children: [
          { title: '사용자관리', path: PATH_ADMIN.admin.users },
          { title: '링크관리', path: PATH_ADMIN.admin.links }
        ]
      }
    ]
  }
];

export default sidebarConfig;
