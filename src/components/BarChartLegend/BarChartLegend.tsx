import { Dot } from '../icons/Dot';
import styles from './BarChartLegend.module.scss';

export const BarChartLegend = ({
  text,
  dotColor,
}: {
  text: string;
  dotColor: string;
}) => {
  return (
    <div className={styles.container}>
      <Dot color={dotColor} />
      <span>{text}</span>
    </div>
  );
};
