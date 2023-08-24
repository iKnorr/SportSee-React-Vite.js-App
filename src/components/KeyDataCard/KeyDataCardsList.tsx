import { Calories } from '../icons/Calories';
import { Carbs } from '../icons/Carbs';
import { Fat } from '../icons/Fat';
import { Protein } from '../icons/Protein';
import { KeyDataCard } from './KeyDataCard';
import styles from './KeyDataCard.module.scss';

type KeyDataProps = {
  keyData: {
    calorieCount?: number;
    proteinCount?: number;
    carbohydrateCount?: number;
    lipidCount?: number;
  };
};

export const KeyDataCardsList = ({ keyData }: KeyDataProps) => {
  return (
    <div className={styles.keyDataContainer}>
      <KeyDataCard
        dietaryTypes="Calories"
        icon={<Calories />}
        amount={`${keyData?.calorieCount}kCal`}
      />
      <KeyDataCard
        dietaryTypes="Proteines"
        icon={<Protein />}
        amount={`${keyData?.proteinCount}g`}
      />
      <KeyDataCard
        dietaryTypes="Glucides"
        icon={<Carbs />}
        amount={`${keyData?.carbohydrateCount}g`}
      />
      <KeyDataCard
        dietaryTypes="Lipides"
        icon={<Fat />}
        amount={`${keyData?.lipidCount}kCal`}
      />
    </div>
  );
};
