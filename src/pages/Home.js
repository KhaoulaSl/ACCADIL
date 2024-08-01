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
        Cette application permet uniquement d'évaluer les différentes interactions et s'assurer
        qu'elles facilitent l'exercice de liaison des coins. 
        Elle ne représente pas l'application finale en terme de dispositions et de couleurs.
      </p>
      <button className="home-button" onClick={handleButtonClick}>
        Aller à la page de comparaison
      </button>
    </div>
  );
}

export default Home;
