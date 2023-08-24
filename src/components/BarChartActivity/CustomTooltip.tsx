import styles from './BarChartActivity.module.scss';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.customTooltipKg}>{`${payload[0].value}kg`}</p>
        <p className={styles.customTooltipKcal}>{`${payload[1].value}Kcal`}</p>
      </div>
    );
  }

  return null;
};
