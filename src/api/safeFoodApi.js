import apiClient from './client';

export const getSafeFoods = async (filters = {}) => {
  try {
    // Construct query parameters if any filters are provided
    const queryParts = [];
    if (filters.type) queryParts.push(`type=${encodeURIComponent(filters.type)}`);
    if (filters.temperature) queryParts.push(`temperature=${encodeURIComponent(filters.temperature)}`);
    if (filters.search) queryParts.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters.favorite !== undefined) queryParts.push(`favorite=${filters.favorite}`);
    
    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    const response = await apiClient.get(`/safe-foods${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const getSafeFoodById = async (id) => {
  try {
    const response = await apiClient.get(`/safe-foods/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const createSafeFood = async (foodData) => {
  try {
    const response = await apiClient.post('/safe-foods', foodData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const updateSafeFood = async (id, foodData) => {
  try {
    const response = await apiClient.put(`/safe-foods/${id}`, foodData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const deleteSafeFood = async (id) => {
  try {
    const response = await apiClient.delete(`/safe-foods/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const toggleFavoriteSafeFood = async (id) => {
  try {
    const response = await apiClient.patch(`/safe-foods/${id}/favorite`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};
