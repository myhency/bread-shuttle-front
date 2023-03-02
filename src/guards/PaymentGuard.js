import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import usePayment from '../hooks/usePayment';
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';
import { setSession } from '../utils/jwt';

PaymentGuard.propTypes = {
  children: PropTypes.node
};

export default function PaymentGuard({ children }) {
  const { paymentState, getPayment, _pathname } = usePayment();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  console.log(_pathname);
  useEffect(() => {
    console.log('paymentState', paymentState);
    getPayment();
  }, [_pathname]);

  if (paymentState !== 'PAYMENT' && paymentState !== 'INIT') {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // logoutFunc();
    setSession(null);
    window.alert(
      '기간이 만료되었습니다. 농협 352-1625-3653-73 (브레드스톡)으로 입금해주시면 자동 연장 처리됩니다.\n로그인 화면으로 이동합니다.'
    );
    window.location.reload();
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <>{children}</>;
}
