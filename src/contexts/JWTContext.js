import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession, decodeJwt } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('alsdkfjalsdfjlaskdfjlaskdjflasdkjf');
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/v1/platform/auth/user/my-info');
          const user = response.data.data;

          console.log(user);

          const today = new Date();
          const paymentEndDate = new Date(user.paymentEndDate);
          const formattedToday = new Date(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
          const formattedPaymentEndDate = new Date(
            `${paymentEndDate.getFullYear()}-${paymentEndDate.getMonth()}-${paymentEndDate.getDate()}`
          );
          const unixTimestampForToday = Math.floor(formattedToday / 1000);
          const unixTimestampForPaymentEndDate = Math.floor(formattedPaymentEndDate / 1000);

          if ((unixTimestampForPaymentEndDate - unixTimestampForToday) / 3600 / 24 >= 0) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user: {
                  ...user,
                  displayName: user.role === 'ROLE_ADMIN' ? '주식훈련소 스탭님' : '회원님',
                  paymentEndDate: user.paymentEndDate
                }
              }
            });
          } else {
            setSession(null);
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null
              }
            });
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (userName, password) => {
    const response = await axios.post('/api/v1/platform/auth/login', {
      userName,
      password
    });

    const user = response.data.data;
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
    console.log((formattedPaymentStartDate - unixTimestampForToday) / 3600 / 24);
    if (!user.paymentEndDate) {
      setSession(null);
      dispatch({ type: 'LOGOUT' });
      throw new Error('NoPayment');
    } else if ((unixTimestampForPaymentEndDate - unixTimestampForToday) / 3600 / 24 < 0) {
      setSession(null);
      dispatch({ type: 'LOGOUT' });
      throw new Error('Expired');
    } else if ((unixTimestampForPaymentStartDate - unixTimestampForToday) / 3600 / 24 > 0) {
      setSession(null);
      dispatch({ type: 'LOGOUT' });
      throw new Error('NotStarted');
    } else {
      setSession(user.token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: { ...user, displayName: user.role === 'ROLE_ADMIN' ? '주식훈련소 스탭님' : '회원님' }
        }
      });
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
