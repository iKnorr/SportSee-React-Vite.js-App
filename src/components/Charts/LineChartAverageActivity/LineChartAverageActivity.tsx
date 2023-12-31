import { useEffect, useState } from 'react';
import { fetchUserData } from '../../../services/userService';
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import { CustomToolTipLineChart } from './CustomizedElement/CustomToolTipLineChart';
import styles from './LineChartAverageActivity.module.scss';
import { CustomizedActiveDot } from './CustomizedElement/CustomizedActiveDot';
import { formatDay } from '../../../services/chartService';
import { CustomLegend } from './CustomizedElement/CustomLegend';
import { DataMapper } from '../../../services/dataMapper';
import { useNavigate } from 'react-router-dom';

type AverageSession = {
  day: number;
  sessionLength: number;
};

type AverageActivityType = {
  averageSessions: AverageSession[];
};

export const LineChartAverageActivity = ({ userId }: { userId?: string }) => {
  const [userAverageActivityData, setUserAverageActivityUserData] = useState<
    AverageActivityType | undefined
  >(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId, 'average-sessions');

        setUserAverageActivityUserData(
          DataMapper.transformUserAverageSessionsData(response)
        );
      } catch (error) {
        console.log(error);
        navigate('*');
      }
    };
    fetchData();
  }, [userId]);

  if (!userAverageActivityData) return null;

  const { averageSessions } = userAverageActivityData;

  return (
    <div className={styles.container}>
      <LineChart
        width={258}
        height={263}
        data={averageSessions}
        margin={{ left: 20, right: 20, top: 15, bottom: 10 }}
        style={{
          backgroundColor: '#E60000',
          borderRadius: '1rem',
        }}
      >
        <XAxis
          dataKey={'day'}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatDay}
          stroke="rgba(255, 255, 255, 0.5)"
        />
        <Tooltip cursor={false} content={<CustomToolTipLineChart />} />
        <Legend align="left" verticalAlign="top" content={<CustomLegend />} />
        <Line
          type="bumpX"
          dataKey="sessionLength"
          stroke="white"
          dot={false}
          activeDot={<CustomizedActiveDot />}
        />
      </LineChart>
    </div>
  );
};
