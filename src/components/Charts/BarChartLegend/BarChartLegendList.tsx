import { BarChartLegend } from './BarChartLegend';
import styles from './BarChartLegend.module.scss';

export const BarChartLegendList = () => {
  return (
    <div className={styles.listContainer}>
      <BarChartLegend text="Poids (kg)" dotColor="black" />
      <BarChartLegend text="Calories brûlées (kCal)" dotColor="red" />
    </div>
  );
};
