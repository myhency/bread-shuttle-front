// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
    subheader: 'Dashboard',
    items: [
      {
        title: '거래현황',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      }
      // { title: '007빵 통계', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce }
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
    ]
  },

  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Trade',
    items: [
      {
        title: '빅파이',
        path: PATH_DASHBOARD.bigpie.root,
        icon: ICONS.bus,
        children: [
          { title: '빅파이 실시간', path: PATH_DASHBOARD.bigpie.realtime },
          { title: '날짜별 빅파이', path: PATH_DASHBOARD.general.banking }
        ]
      },
      {
        title: '007빵',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.filter7,
        children: [
          { title: '007빵 공지', path: PATH_DASHBOARD.general.ecommerce },
          { title: '007빵 실시간', path: PATH_DASHBOARD.general.analytics },
          { title: '007빵 리스트', path: PATH_DASHBOARD.general.banking },
          { title: '007빵 통계', path: PATH_DASHBOARD.general.banking }
        ]
      },
      {
        title: '알리미',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.notificationsactive,
        children: [
          { title: '알리미 리스트', path: PATH_DASHBOARD.general.ecommerce },
          { title: '알람완료', path: PATH_DASHBOARD.general.analytics },
          { title: '손절처리', path: PATH_DASHBOARD.general.banking }
        ]
      },
      {
        title: '유통주식수/거래량',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.viewlist
      }
    ]
  },

  // 즐겨찾기
  // ----------------------------------------------------------------------
  {
    subheader: 'links',
    items: [
      {
        title: '즐겨찾기',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.bookmarks,
        children: [
          { title: '증시스케줄', path: PATH_DASHBOARD.general.ecommerce },
          { title: '네이버 경제뉴스', path: PATH_DASHBOARD.general.analytics },
          { title: 'Company Guide', path: PATH_DASHBOARD.general.banking },
          { title: '10월의 텔레그램', path: PATH_DASHBOARD.general.booking }
        ]
      }
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
