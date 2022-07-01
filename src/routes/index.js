import { Suspense, lazy } from 'react';
import {
  Navigate,
  useRoutes,
  useLocation
  // Link
} from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'bigpie',
          children: [
            { element: <Navigate to="/dashboard/bigpie/realtime" replace /> },
            { path: 'realtime', element: <BigPieRealTime /> },
            { path: 'list', element: <BigPieList /> }
          ]
        },
        {
          path: 'sevenBread',
          children: [
            { element: <Navigate to="/dashboard/sevenBread/realtime" replace /> },
            { path: 'realtime', element: <SevenBreadRealTime /> },
            { path: 'list', element: <SevenBreadList /> }
          ]
        },
        {
          path: 'tradingVolume',
          children: [
            { element: <Navigate to="/dashboard/tradingVolume/list" replace /> },
            { path: 'list', element: <TradingVolumeList /> },
            { path: 'search', element: <TradingVolumeSearch /> },
            { path: 'theme', element: <TradingVolumeTheme /> }
          ]
        }
      ]
    },

    // Admin Routes
    {
      path: 'admin',
      element: (
        <RoleBasedGuard accessibleRoles={['ROLE_ADMIN']}>
          <DashboardLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: 'sevenBread',
          children: [
            { element: <Navigate to="/admin/sevenBread/management" replace /> },
            { path: 'management', element: <SevenBreadManage /> },
            { path: 'newItem', element: <SevenBreadNewItem /> },
            { path: ':itemCode/edit', element: <SevenBreadNewItem /> }
          ]
        },
        {
          path: 'stockItems',
          children: [
            { element: <Navigate to="/admin/stockItems/list" replace /> },
            { path: 'stockItems/list', element: <StockItems /> }
          ]
        },
        {
          path: 'users',
          children: [
            { path: 'management', element: <UserManage /> },
            { path: 'management/create', element: <UserCreate /> },
            { path: 'management/:id/edit', element: <UserCreate /> }
          ]
        },
        {
          path: 'links',
          children: [
            { path: 'management', element: <LinkManage /> },
            { path: 'management/:id/edit', element: <LinkEdit /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/dashboard/bigpie/realtime" />
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Admin
const StockItems = Loadable(lazy(() => import('../pages/admin/StockItems')));
const SevenBreadManage = Loadable(lazy(() => import('../pages/admin/sevenBread/SevenBreadManage')));
const SevenBreadNewItem = Loadable(lazy(() => import('../pages/admin/sevenBread/SevenBreadNewItem')));
const UserManage = Loadable(lazy(() => import('../pages/admin/users/UserManage')));
const UserCreate = Loadable(lazy(() => import('../pages/admin/users/UserCreate')));
const LinkManage = Loadable(lazy(() => import('../pages/admin/links/LinkManage')));
const LinkEdit = Loadable(lazy(() => import('../pages/admin/links/LinkEdit')));
// Dashboard
const BigPieRealTime = Loadable(lazy(() => import('../pages/bigpie/BigPieRealTime')));
const BigPieList = Loadable(lazy(() => import('../pages/bigpie/BigPieList')));
const SevenBreadRealTime = Loadable(lazy(() => import('../pages/sevenbread/SevenBreadRealTime')));
const SevenBreadList = Loadable(lazy(() => import('../pages/sevenbread/SevenBreadList')));
const TradingVolumeList = Loadable(lazy(() => import('../pages/trading-volume/TradingVolumeList')));
const TradingVolumeSearch = Loadable(lazy(() => import('../pages/trading-volume/TradingVolumeSearch')));
const TradingVolumeTheme = Loadable(lazy(() => import('../pages/trading-volume/TradingVolumeTheme')));
// Main
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
