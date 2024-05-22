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
  const isLogged = sessionStorage.getItem('token');

  const logOut = () => {
    setShowConfirmation(true);
  }

  const confirmLogout = () => {
    setShowConfirmation(false);
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <Navbar >
      <Container>
        <Navbar.Brand style={{ color: 'white' }}>
          <Link to={'/'} className={styles.link}>
            Trevisan Forecast
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link>
              <Link to={'/locations'} className={styles.link}>
                Localizações
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/login'} className={styles.link} style={{ display: isLogged != null ? 'none' : 'block'}}>
                Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/register'} className={styles.link} style={{ display: isLogged != null ? 'none' : 'block'}}>
                Cadastro
              </Link>
            </Nav.Link>
            <Nav.Link style={{ display: isLogged != null ? 'block' : 'none'}} className={styles.link} onClick={() => logOut()}>
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
            <Button variant="secondary" onClick={cancelLogout}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmLogout}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Navbar>
  )
}