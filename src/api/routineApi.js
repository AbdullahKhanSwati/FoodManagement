import apiClient from './client';

export const getRoutines = async () => {
  try {
    const response = await apiClient.get('/routines');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const getRoutineById = async (id) => {
  try {
    const response = await apiClient.get(`/routines/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const createRoutine = async (routineData) => {
  try {
    const response = await apiClient.post('/routines', routineData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const updateRoutine = async (id, routineData) => {
  try {
    const response = await apiClient.put(`/routines/${id}`, routineData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const deleteRoutine = async (id) => {
  try {
    const response = await apiClient.delete(`/routines/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const addStep = async (id, stepData) => {
  try {
    const response = await apiClient.post(`/routines/${id}/steps`, stepData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const updateStep = async (id, stepIndex, stepData) => {
  try {
    const response = await apiClient.put(`/routines/${id}/steps/${stepIndex}`, stepData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};

export const deleteStep = async (id, stepIndex) => {
  try {
    const response = await apiClient.delete(`/routines/${id}/steps/${stepIndex}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network Error', success: false };
  }
};
