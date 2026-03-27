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

const BASE_URL = 'https://food-support-ten.vercel.app/api/v1'; // ← Changed to .3, which is your actual PC's IP. .1 is your router!

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
  (error) => Promise.reject(error)
);

export default apiClient;