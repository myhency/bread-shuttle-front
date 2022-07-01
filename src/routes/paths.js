/* eslint-disable react-hooks/rules-of-hooks */
import iconv from 'iconv-lite';
import { fDateStringFormat } from '../utils/formatTime';
// ----------------------------------------------------------------------

export function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  sevenBread: {
    root: path(ROOTS_ADMIN, '/sevenBread'),
    management: path(ROOTS_ADMIN, '/sevenBread/management'),
    newItem: path(ROOTS_ADMIN, '/sevenBread/newItem'),
    editItem: path(ROOTS_ADMIN, '/sevenBread/:itemCode/edit')
  },
  admin: {
    root: path(ROOTS_ADMIN, '/stockItems'),
    stockItems: path(ROOTS_ADMIN, '/stockItems/list'),
    users: path(ROOTS_ADMIN, '/users/management'),
    newUser: path(ROOTS_ADMIN, '/users/management/create'),
    editUser: path(ROOTS_ADMIN, '/users/management/:id/edit'),
    links: path(ROOTS_ADMIN, '/links/management'),
    editLink: path(ROOTS_ADMIN, '/links/management/:id/edit')
  }
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    bigpie: path(ROOTS_DASHBOARD, '/bigpie'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  bigpie: {
    root: path(ROOTS_DASHBOARD, '/bigpie'),
    realtime: path(ROOTS_DASHBOARD, '/bigpie/realtime'),
    list: path(ROOTS_DASHBOARD, '/bigpie/list')
  },
  sevenBread: {
    root: path(ROOTS_DASHBOARD, '/sevenBread'),
    notice: path(ROOTS_DASHBOARD, '/sevenBread/notice'),
    realtime: path(ROOTS_DASHBOARD, '/sevenBread/realtime'),
    list: path(ROOTS_DASHBOARD, '/sevenBread/list')
  },
  tradingVolume: {
    root: path(ROOTS_DASHBOARD, '/tradingVolume'),
    list: path(ROOTS_DASHBOARD, '/tradingVolume/list'),
    search: path(ROOTS_DASHBOARD, '/tradingVolume/search'),
    theme: path(ROOTS_DASHBOARD, '/tradingVolume/theme')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    settings: path(ROOTS_DASHBOARD, '/user/:id/edit')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
export const PATH_SEVENBREAD_NOTICE =
  'https://www.evernote.com/shard/s408/sh/6791a237-1714-fc63-da31-d28d08a7fe4d/5d5d9714617de674fa9bf8952ad3877e';
export const PATH_NOTICE_LECTURE =
  'https://www.evernote.com/shard/s744/sh/a60e8d23-43c9-d4dc-29a9-b59f568748ea/af7e9d6722df0767219cd53891f07f68';
export const PATH_STOCK_CALENDAR = 'http://www.paxnet.co.kr/stock/infoStock/issueCalendarMonth';
export const PATH_NAVER_ECONOMIC_NEWS = 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101';
export const PATH_COMPANY_GUIDE =
  'http://comp.fnguide.com/SVO2/asp/SVD_comp_calendar.asp?pGB=1&gicode=A005930&gcd=&gnm=&curdt=&ctp=&cID=&MenuYn=Y&ReportGB=&NewMenuID=701&stkGb=701';
export const PATH_TELEGRAM_THIS_MONTH = 'https://t.me/+RL1clhOVMEpmNTM1';

export const PATH_ALPHA_LINK = 'https://alphasquare.co.kr/home/stock/stock-summary?code=';
export const PATH_M_ALPHA_LINK = 'https://m.alphasquare.co.kr/service/chart?code=';
export const PATH_FN_LINK = 'http://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A';
export const PATH_NAVER_LINK = 'https://finance.naver.com/item/coinfo.naver?code=';
export const PATH_HANKYUNG_LINK = (searchText) => {
  const buffer = iconv.encode(searchText, 'euc-kr');
  const param = escape(buffer.toString('binary'));
  const sdate = fDateStringFormat(new Date().setDate(new Date().getDate() - 186));
  const edate = fDateStringFormat(new Date());
  return `http://consensus.hankyung.com/apps.analysis/analysis.list?sdate=${sdate}&edate=${edate}&now_page=1&search_value=&report_type=&pagenum=20&search_text=${param}&business_code=`;
};
export const PATH_HANKYUNG_MLINK = (searchText) =>
  `http://consensus.hankyung.com/apps.analysis/analysis.list?skinType=&search_date=6m&search_text=${searchText}`;
export const PATH_GOOGLE_NEWS_LINK = (searchText) => `https://www.google.com/search?q=${searchText}&tbm=nws`;

export const PATH_TODAY_REPORT = 'https://comp.wisereport.co.kr/wiseReport/summary/ReportSummary.aspx';
export const PATH_BIGPIE_MANUAL_LINK = 'https://far-pudding-e28.notion.site/43d0a77ebcc24a2f8af530021c6b81bd';
export const PATH_BREADSHUTTLE_MANUAL_LINK = 'https://lively-flamingo-301.notion.site/62a424fd3d1743518da41ace35288c14';

export const PATH_SEVENBREAD_CHANGES = 'https://tidy-field-695.notion.site/15372f45a8444b1bb14f461cc9dbe0f7';
export const PATH_NEW_USER_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLScWGUGnPzVgwMkHk02BDKlptvOHDEsgHdfXMU84KnPBQZYIIg/viewform';
export const PATH_BIGPIE_CHANGES = 'https://lively-flamingo-301.notion.site/v22-07-b640868684a54b2382250e4c66f51a0e';
