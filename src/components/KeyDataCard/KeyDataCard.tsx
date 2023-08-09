import { ReactNode } from 'react';
import styles from './KeyDataCard.module.scss';

interface KeyDataCardProps {
  icon: ReactNode;
  amount: number | string;
  dietaryTypes: string;
}

export const KeyDataCard = ({
  icon,
  dietaryTypes,
  amount,
}: KeyDataCardProps) => {
  return (
    <div className={styles.container}>
      <div>{icon}</div>
      <div className={styles.textWrapper}>
        <h3>{amount}</h3>
        <p>{dietaryTypes}</p>
      </div>
    </div>
  );
};
