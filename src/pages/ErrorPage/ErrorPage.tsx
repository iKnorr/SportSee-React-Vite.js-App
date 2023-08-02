/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>Oups!</h1>
      <p>Désolé, une erreur inattendue s'est produite. &#128546;</p>
      <Link
        to="/"
        style={{ color: 'white' }}
      >{`Retourner sur la page d’accueil`}</Link>
    </div>
  );
};
