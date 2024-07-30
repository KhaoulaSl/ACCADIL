import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ComparePage from './pages/ComparePage';
import { auth, db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Nettoyez l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleShow = () => setShowLogin(true);
  const handleClose = () => {
    setShowLogin(false);
    setErrorMessage('');
  };

  const handleLogin = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsAuthenticated(true);
        handleClose();
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('Email ou mot de passe incorrect');
      });
  };

  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
    setErrorMessage('');
  };

  const handleSignup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      console.log('Inscription réussie :', user);
      setIsAuthenticated(true);
      handleCloseSignup();
    } catch (error) {
      console.error('Erreur d\'inscription :', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header handleShow={handleShow} isAuthenticated={isAuthenticated} />
        <Login
          show={showLogin}
          handleClose={handleClose}
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          handleShowSignup={handleShowSignup}
        />
        <Signup
          show={showSignup}
          handleClose={handleCloseSignup}
          handleSignup={handleSignup}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/compare" element={isAuthenticated ? <ComparePage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
