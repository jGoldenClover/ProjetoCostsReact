import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./NavBar.module.css";
import logo from "../../img/icon_costs.png";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Container>

        <Link to="/">
          <img src={logo} alt="costs" className={styles.logo_img}/>
        </Link>
        <ul className={styles.list}>
          
          <li className={styles.item}>
            <Link to="/">Sobre</Link>
          </li>

          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>

          <li className={styles.item}>
            <Link to="/company">Empresa</Link>
          </li>

          <li className={styles.item}>
            <Link to="/projects">Projetos</Link>
          </li>

          

        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
