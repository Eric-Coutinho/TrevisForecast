import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ margin: '0' }}>
        <Navbar.Brand>
          <Link to={'/teste'} className={styles.link}>
            Trevisan Forecast
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navText}>
          <Nav>
            <NavDropdown title="Localizações" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Curitiba</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              São Paulo
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Porto Alegre</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#link">Cadastro</Nav.Link>
            <Nav.Link href="#link">Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}