import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function NavBar() {
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
            <Nav.Link>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}