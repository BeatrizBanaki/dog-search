import React, { createContext, useReducer, useContext } from "react";

// Estado inicial do contexto
const initialState = {
  images: [],
  errorMessage: null,
};

// Função redutora para gerenciar ações
const dogReducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return { ...state, images: action.payload, errorMessage: null };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

// Criação do contexto
const DogContext = createContext();

// Provider que usa o useReducer
export const DogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dogReducer, initialState);

  // Funções para interagir com o estado
  const fetchImages = async (breed) => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await response.json();
      if (data.status === "success") {
        dispatch({ type: "SET_IMAGES", payload: data.message });
      } else {
        dispatch({ type: "SET_ERROR", payload: "Breed not found" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "An error occurred" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <DogContext.Provider
      value={{
        images: state.images,
        errorMessage: state.errorMessage,
        fetchImages,
        clearError,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

// Hook para usar o contexto
export const useDogContext = () => useContext(DogContext);
