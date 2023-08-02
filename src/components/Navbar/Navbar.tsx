import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import styles from './Navbar.module.scss';

export const Navbar = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Logo />
          <h1>SportSee</h1>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.link}>
            Accueil
          </Link>
          <Link to="/" className={styles.link}>
            Profil
          </Link>
          <Link to="/" className={styles.link}>
            Réglage
          </Link>
          <Link to="/" className={styles.link}>
            Communauté
          </Link>
        </div>
      </div>
      <div className={styles.horizontalWrapper}>
        <div className={styles.sidebar}></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
