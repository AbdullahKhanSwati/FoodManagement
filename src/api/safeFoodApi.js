import apiClient from './client';

export const getSafeFoods = async (filters = {}) => {
  const queryParts = [];
  if (filters.type) queryParts.push(`type=${encodeURIComponent(filters.type)}`);
  if (filters.temperature) queryParts.push(`temperature=${encodeURIComponent(filters.temperature)}`);
  if (filters.search) queryParts.push(`search=${encodeURIComponent(filters.search)}`);
  if (filters.favorite !== undefined) queryParts.push(`favorite=${filters.favorite}`);

  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const response = await apiClient.get(`/safe-foods${queryString}`);
  return response.data;
};

export const getSafeFoodById = async (id) => {
  const response = await apiClient.get(`/safe-foods/${id}`);
  return response.data;
};

export const createSafeFood = async (foodData) => {
  const response = await apiClient.post('/safe-foods', foodData);
  return response.data;
};

export const updateSafeFood = async (id, foodData) => {
  const response = await apiClient.put(`/safe-foods/${id}`, foodData);
  return response.data;
};

export const deleteSafeFood = async (id) => {
  const response = await apiClient.delete(`/safe-foods/${id}`);
  return response.data;
};

export const toggleFavoriteSafeFood = async (id) => {
  const response = await apiClient.patch(`/safe-foods/${id}/favorite`);
  return response.data;
};
