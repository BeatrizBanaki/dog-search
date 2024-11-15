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

export const fetchAllBreeds = async () => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    return Object.keys(response.data.message); 
  } catch (error) {
    console.error("Error fetching breeds list:", error);
    return [];
  }
};

export const fetchRandomDogImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      return response.data.message;
    } catch (error) {
      console.error("Error fetching random dog image:", error);
      return null;
    }
  };