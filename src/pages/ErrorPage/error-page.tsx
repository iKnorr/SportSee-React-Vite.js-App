import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  // const error = useRouteError();
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error.statusText || error.message);

  return (
    <div className={styles.errorPage}>
      <h1>Oups!</h1>
      <p>Désolé, une erreur inattendue s'est produite. &#128546;</p>
      <Link to="/">{`Retourner sur la page d’accueil`}</Link>
    </div>
  );
};
