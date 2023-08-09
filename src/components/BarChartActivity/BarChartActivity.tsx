import { useEffect, useState } from 'react';
import styles from './BarChartActivity.module.scss';
import { fetchUserData } from '../../services/userService';
import { UserActivityData } from '../../services/userModels';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type APIResponse = {
  data: UserActivityData;
};

export const BarChartActivity = ({ userId }: { userId?: string }) => {
  const [userActivityData, setActivityUserData] = useState<APIResponse | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId, 'activity');

        setActivityUserData({
          data: new UserActivityData(
            response?.data?.data.userId,
            response?.data?.data.sessions
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!userActivityData) return null;

  const { sessions } = userActivityData.data;

  const modifiedDate = (date: string) => {
    const newDate = new Date(date);
    const dayOfMonth = newDate.getDate();
    return dayOfMonth;
  };

  console.log(sessions);
  return (
    <div className={styles.container}>
      <ResponsiveContainer width={835} height={320}>
        <BarChart
          data={sessions}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid
            strokeDasharray="2"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={modifiedDate('day')}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            dataKey="calories"
            orientation="right"
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            height={80}
            iconType="circle"
          />
          <Bar dataKey="kilogram" fill="black" barSize={7} />
          <Bar dataKey="calories" fill="red" barSize={7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
