import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import styles from '../LineChartAverageActivity.module.scss';

export const CustomToolTipLineChart = ({
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.customTooltipMin}>{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};
