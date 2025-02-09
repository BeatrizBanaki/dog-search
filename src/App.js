import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import Breeds from './components/Breeds';
import AddBreed from './components/AddBreed';
import BreedGallery from './components/BreedGallery';
import Layout from './components/Layout'; // Importa o layout

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Layout><Login /></Layout>} />
          {/* Rotas dentro do Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/breeds"
            element={
              <Layout>
                <Breeds />
              </Layout>
            }
          />
          <Route path="/add-breed" element={<Layout><AddBreed /></Layout>} />
          <Route path="/gallery" element={<Layout><BreedGallery /></Layout>} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


