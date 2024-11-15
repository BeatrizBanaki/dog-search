import axios from 'axios';

export const fetchDogs = async (breed) => {
  try {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/10`);
    return response.data.message || [];
  } catch (error) {
    console.error("Error fetching dog images:", error);
    return [];
  }
};
