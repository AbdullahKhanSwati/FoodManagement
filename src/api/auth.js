import apiClient from './client';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const register = async (name, email, password) => {
  try {
    console.log("inside auth",name,email,password);
    const response = await apiClient.post('/users/register', { name, email, password });
    console.log(name,email);
    return response.data;
    
  } catch (error) {
    console.log("error is ",error);
    throw error.response?.data || { message: error, success: false };
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};
