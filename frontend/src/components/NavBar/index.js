import { Link, useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import styles from './styles.module.scss';
import { useState } from 'react';

export default function NavBar() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const logOut = () => {
    setShowConfirmation(true);
  }

  const confirmLogout = () => {
    setShowConfirmation(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ margin: '0' }}>
        <Navbar.Brand>
          Trevisan Forecast
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navText}>
          <Nav>
            <Nav.Link>
              <Link to={'/places'} className={styles.link}>
                Localizações
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/login'} className={styles.link}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/register'} className={styles.link}>
                Cadastro
              </Link>
            </Nav.Link>
            <Nav.Link onClick={() => logOut()}>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showConfirmation && (
        <Modal show={showConfirmation} onHide={cancelLogout}>
          <Modal.Header closeButton>
            <Modal.Title>Deseja finalizar sua sessão?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="danger" onClick={cancelLogout}>
              Cancelar
            </Button>
            <Button variant="success" onClick={confirmLogout}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Navbar>
  )
}