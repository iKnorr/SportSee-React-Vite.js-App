import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import styles from '../LineChartAverageActivity.module.scss';

export const CustomLegend = ({
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (payload && payload.length) {
    return (
      <div className={styles.customLegendContainer}>
        <p className={styles.customLegendText}>Durée moyenne des sessions</p>
      </div>
    );
  }

  return null;
};
