// import axios from 'axios';
// import { getToken } from '../utils/storage';

// // In a real app, use react-native-dotenv or Expo Config. 
// // For Android emulator, use 10.0.2.2. For physical device, use your local IP.
// const BASE_URL = 'https://10.172.207.57:5000/api/v1';

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default apiClient;



import axios from 'axios';
import { getToken } from '../utils/storage';

const BASE_URL = 'https://food-support-ten.vercel.app/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.error('[API] Request setup error:', error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    const serverMessage = error.response?.data?.message;

    console.error(
      `[API] ${method} ${url} failed — status: ${status ?? 'NO_RESPONSE'} | message: ${serverMessage ?? error.message}`
    );

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({ success: false, message: error.message || 'Network error — check your connection' });
  }
);

export default apiClient;