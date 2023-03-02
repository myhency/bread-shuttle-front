import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
const accessToken = localStorage.getItem('accessToken');
axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default axiosInstance;
