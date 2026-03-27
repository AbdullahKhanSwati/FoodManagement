import client from './client';

export const getFoodSuggestions = async ({ mealSize, temperature, foodType }) => {
  try {
    const res = await client.post('/ai/suggestions', { mealSize, temperature, foodType });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching suggestions');
    }
    throw error;
  }
};
