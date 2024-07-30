import './Header.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="circular-button"
  >
    {children}
  </button>
));

const Header = ({ handleShow, isAuthenticated }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Déconnexion réussie');
        navigate('/'); // Rediriger vers la page d'accueil ou de connexion
      })
      .catch((error) => {
        console.error('Erreur de déconnexion :', error);
      });
  };

  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
        <Nav className="me-auto mb-2 mb-lg-0">
        </Nav>
        <div className="d-flex">
          {!isAuthenticated && (
            <Button variant="success" onClick={handleShow}>
              Se connecter
            </Button>
          )}
          {isAuthenticated && (
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} size='lg'>
                <PersonFill />
              </Dropdown.Toggle>
              
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => navigate('/profile')}>Informations</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/profile/settings')}>Profil</Dropdown.Item>
                <Dropdown.Item onClick={handleSignOut}>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Container>
    </Navbar>
  );
};


export default Header;