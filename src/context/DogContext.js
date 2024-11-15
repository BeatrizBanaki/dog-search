import React, { createContext, useState, useContext } from 'react';

const DogContext = createContext();

export const DogProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchImages = async (breed) => {
    setErrorMessage(''); 
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random/3?breed=${breed}`);
      const data = await response.json();
      if (data.status === 'success') {
        setImages(data.message);
      } else {
        setErrorMessage(`No images found for breed: ${breed}`);
      }
    } catch (error) {
      setErrorMessage('Error fetching images. Please try again later.');
    }
  };

  const value = {
    images,
    errorMessage,
    fetchImages,
  };

  return (
    <DogContext.Provider value={value}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  return useContext(DogContext);
};
