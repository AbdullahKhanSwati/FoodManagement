import client from './client';

export const addSafeFood = async (foodData) => {
  try {
    const res = await client.post('/safe-foods', foodData);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error saving safe food');
    }
    throw error;
  }
};

export const getSafeFoods = async () => {
  try {
    const res = await client.get('/safe-foods');
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error getting safe foods');
    }
    throw error;
  }
};
