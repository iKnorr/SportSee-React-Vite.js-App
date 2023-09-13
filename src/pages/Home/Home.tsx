import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { Logo } from '../../components/icons/Logo';

const Home = () => {
  return (
    <div className={styles.containerHome}>
      <Logo width="10rem" height="10rem" />
      <h1>Bienvenue au SportSee</h1>
      <div style={{ display: 'flex', gap: '50px' }}>
        <Link to={`/user/12`}>User 12</Link>
        <Link to={`/user/18`}>User 18</Link>
      </div>
    </div>
  );
};

export default Home;
