import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = ({ show, handleClose, handleLogin, errorMessage, handleShowSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password, navigate);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Connexion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adresse e-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <Button variant="primary" type="submit">
                        Se connecter
                    </Button>
                    <Button variant="link" onClick={handleShowSignup}>
                        S'inscrire
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
