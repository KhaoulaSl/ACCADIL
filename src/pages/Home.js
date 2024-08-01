import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Assurez-vous que ce fichier CSS est bien importé

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/compare');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur l'évaluation d'interactions</h1>
      <p className="home-description">
        Utilisez cette application pour comparer des images en utilisant des matrices de transformation. 
        Cliquez sur le bouton ci-dessous pour accéder à la page de comparaison.
      </p>
      <button className="home-button" onClick={handleButtonClick}>
        Aller à la page de comparaison
      </button>
    </div>
  );
}

export default Home;
