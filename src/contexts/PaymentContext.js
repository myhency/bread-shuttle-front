import { createContext, useEffect, useReducer } from 'react';
// utils
import {
  useLocation
  // Link
} from 'react-router-dom';
import axios from '../utils/axios';
import { isValidToken, setSession, decodeJwt } from '../utils/jwt';

const initialState = {
  paymentState: 'INIT',
  _pathname: ''
};

const handlers = {
  NO_PAYMENT: (state, action) => {
    const { paymentState, _pathname } = action.payload;
    return {
      ...state,
      paymentState,
      _pathname
    };
  },
  PAYMENT: (state, action) => {
    const { paymentState, _pathname } = action.payload;
    return {
      ...state,
      paymentState,
      _pathname
    };
  },
  NOT_STARTED: (state, action) => {
    const { paymentState, _pathname } = action.payload;
    return {
      ...state,
      paymentState,
      _pathname
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const PaymentContext = createContext({
  ...initialState,
  getPayment: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useLocation();

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    try {
      const response = await axios.get('/api/v1/platform/auth/user/my-info');
      const user = response.data.data;
      console.log(user);
      const today = new Date();
      const paymentEndDate = new Date(user.paymentEndDate);
      const paymentStartDate = new Date(user.paymentStartDate);
      const formattedToday = new Date(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
      const formattedPaymentEndDate = new Date(
        `${paymentEndDate.getFullYear()}-${paymentEndDate.getMonth()}-${paymentEndDate.getDate()}`
      );
      const formattedPaymentStartDate = new Date(
        `${paymentStartDate.getFullYear()}-${paymentStartDate.getMonth()}-${paymentStartDate.getDate()}`
      );
      const unixTimestampForToday = Math.floor(formattedToday / 1000);
      const unixTimestampForPaymentEndDate = Math.floor(formattedPaymentEndDate / 1000);
      const unixTimestampForPaymentStartDate = Math.floor(formattedPaymentStartDate / 1000);

      console.log((unixTimestampForPaymentEndDate - unixTimestampForToday) / 3600 / 24);

      if ((unixTimestampForPaymentEndDate - unixTimestampForToday) / 3600 / 24 >= 0) {
        dispatch({
          type: 'PAYMENT',
          payload: {
            paymentState: 'PAYMENT',
            _pathname: pathname
          }
        });
      } else if ((unixTimestampForPaymentEndDate - unixTimestampForToday) / 3600 / 24 < 0) {
        dispatch({
          type: 'NO_PAYMENT',
          payload: {
            paymentState: 'NO_PAYMENT',
            _pathname: pathname
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <PaymentContext.Provider
      value={{
        ...state,
        getPayment,
        logout,
        _pathname: pathname
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export { PaymentContext, PaymentProvider };
