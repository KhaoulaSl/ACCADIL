import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ComparePage from './pages/ComparePage';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/compare');
  };

  return (
    <div className="home">
      <h1>Bienvenue sur l'application de comparaison</h1>
      <button onClick={handleButtonClick}>Aller à la page de comparaison</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
