import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import styles from './RadialChartScore.module.scss';

export type ChartData = {
  name: string;
  value: number;
  fill: string;
}[];

export const RadialChartScore = ({ data }: { data: ChartData }) => {
  const circleSize = 200;

  return (
    <div className={styles.radialBarChartWrapper}>
      <h3>Score</h3>
      <div
        className={styles.innerText}
        style={{ background: 'white', width: '14.3rem', height: '14.3rem' }}
      >
        <p>{`${data[0]?.value}%`}</p>
        <p>de votre</p>
        <p>objectif</p>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <RadialBarChart
            width={circleSize}
            height={circleSize}
            cx={circleSize / 2}
            cy={circleSize / 2}
            innerRadius="80%"
            outerRadius="100%"
            barSize={8}
            data={data}
            startAngle={180}
            endAngle={-180}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              enableBackground="red"
              dataKey="value"
              cornerRadius={4}
            />
          </RadialBarChart>
        </div>
      </div>
    </div>
  );
};
