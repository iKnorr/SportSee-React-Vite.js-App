import { useEffect, useState } from 'react';
import styles from './BarChartActivity.module.scss';
import { fetchUserData } from '../../../services/userService';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChartLegendList } from '../BarChartLegend/BarChartLegendList';
import { CustomTooltip } from './CustomTooltip';
import { DataMapper } from '../../../services/dataMapper';

type Session = {
  day: string;
  kilogram: number;
  calories: number;
};

type UserActivityType = {
  userSessions: Session[];
};

export const BarChartActivity = ({ userId }: { userId?: string }) => {
  const [userActivityData, setActivityUserData] = useState<
    UserActivityType | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId, 'activity');
        response?.data?.data?.sessions?.forEach((session: Session) => {
          const date = new Date(session.day);
          const day = date.getDate();
          session.day = day.toString();
        });
        setActivityUserData(DataMapper.transformUserActicityData(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!userActivityData) return null;

  const { userSessions } = userActivityData;

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <span>Activité quotidienne</span>
        <BarChartLegendList />
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={userSessions}
          margin={{
            top: 10,
            right: 10,
            left: 30,
            bottom: 10,
          }}
          barSize={7}
          barGap={7}
        >
          <CartesianGrid
            strokeDasharray="2"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={'day'}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            dataKey="calories"
            orientation="right"
            domain={[0, 'dataMax + 10']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="kilogram" fill="black" radius={[3, 3, 0, 0]} />
          <Bar dataKey="calories" fill="red" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
