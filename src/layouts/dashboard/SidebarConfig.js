// routes
import {
  PATH_DASHBOARD,
  PATH_SEVENBREAD_NOTICE,
  PATH_NOTICE_LECTURE,
  PATH_STOCK_CALENDAR,
  PATH_NAVER_ECONOMIC_NEWS,
  PATH_COMPANY_GUIDE,
  PATH_TELEGRAM_THIS_MONTH,
  PATH_ADMIN
} from '../../routes/paths';
// components
// import Label from '../../components/Label';
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
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  bus: getIcon('ic_bus'),
  arrowright: getIcon('ic_arrow_right'),
  avtimer: getIcon('ic_av_timer'),
  description: getIcon('ic_description'),
  trendingup: getIcon('ic_trending_up'),
  trendingdown: getIcon('ic_trending_down'),
  viewlist: getIcon('ic_view_list'),
  telegram: getIcon('ic_telegram'),
  filter7: getIcon('ic_filter_7'),
  notificationsactive: getIcon('ic_notifications_active'),
  bookmarks: getIcon('ic_bookmarks')
};

const sidebarConfig = [
  // DASHBOARD
  // ----------------------------------------------------------------------
  {
    isAdmin: false,
    subheader: 'Dashboard',
    items: [
      {
        title: '거래현황',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      }
    ]
  },

  // GENERAL
  // ----------------------------------------------------------------------
  {
    isAdmin: false,
    subheader: 'Trade',
    items: [
      {
        title: '빅파이',
        path: PATH_DASHBOARD.bigpie.root,
        icon: ICONS.bus,
        children: [
          { title: '빅파이 실시간', path: PATH_DASHBOARD.bigpie.realtime },
          { title: '날짜별 빅파이', path: PATH_DASHBOARD.bigpie.list }
        ]
      },
      {
        title: '007빵',
        path: PATH_DASHBOARD.sevenBread.root,
        icon: ICONS.filter7,
        children: [
          // { title: '007빵 공지', eLink: PATH_SEVENBREAD_NOTICE },
          { title: '007빵 실시간', path: PATH_DASHBOARD.sevenBread.realtime },
          { title: '007빵 리스트', path: PATH_DASHBOARD.sevenBread.list }
          // { title: '007빵 통계', path: PATH_DASHBOARD.general.banking }
        ]
      },
      // {
      //   title: '알리미',
      //   path: PATH_DASHBOARD.general.ecommerce,
      //   icon: ICONS.notificationsactive,
      //   children: [
      //     { title: '알리미 리스트', path: PATH_DASHBOARD.general.ecommerce },
      //     { title: '알람완료', path: PATH_DASHBOARD.general.analytics },
      //     { title: '손절처리', path: PATH_DASHBOARD.general.banking }
      //   ]
      // },
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
          // { title: '공지/강의', eLink: PATH_NOTICE_LECTURE },
          { title: '증시스케줄', eLink: PATH_STOCK_CALENDAR },
          { title: '네이버 경제뉴스', eLink: PATH_NAVER_ECONOMIC_NEWS },
          { title: 'Company Guide', eLink: PATH_COMPANY_GUIDE },
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
        title: '007빵',
        path: PATH_ADMIN.sevenBread.root,
        icon: ICONS.filter7,
        children: [
          { title: '007빵 종목관리', path: PATH_ADMIN.sevenBread.management },
          { title: '007빵 종목추가', path: PATH_ADMIN.sevenBread.newItem }
        ]
      }
      // {
      //   title: '관리자전용',
      //   path: PATH_ADMIN.admin.root,
      //   icon: ICONS.user,
      //   children: [{ title: '종목테마관리', path: PATH_ADMIN.admin.stockItems }]
      // }
    ]
  }

  // // MANAGEMENT
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account }
  //       ]
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
  //       ]
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
  //       ]
  //     }
  //   ]
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // }
];

export default sidebarConfig;
