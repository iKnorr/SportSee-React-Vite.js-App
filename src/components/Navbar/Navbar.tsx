import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import styles from './Navbar.module.scss';
import { YogaIcon } from '../icons/YogaIcon';
import { Swimming } from '../icons/Swimming';
import { WeightLifting } from '../icons/WeightLifting';
import { Cycling } from '../icons/Cycling';

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
        <div className={styles.sidebar}>
          <div className={styles.iconWrapper}>
            <YogaIcon />
            <Swimming />
            <Cycling />
            <WeightLifting />
          </div>
          <p className={styles.sidebarText}>Copiryght, SportSee 2020</p>
        </div>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
};
