import { useEffect, useState } from 'react';
import { fetchUserData } from '../../../services/userService';
import { UserAverageActivityData } from '../../../services/userModels';
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import { CustomToolTipLineChart } from './CustomizedElement/CustomToolTipLineChart';
import styles from './LineChartAverageActivity.module.scss';
import { CustomizedActiveDot } from './CustomizedElement/CustomizedActiveDot';
import { formatDay } from '../../../services/chartService';
import { CustomLegend } from './CustomizedElement/CustomLegend';

type APIResponse = { data: UserAverageActivityData };

export const LineChartAverageActivity = ({ userId }: { userId?: string }) => {
  const [userAverageActivityData, setUserAverageActivityUserData] =
    useState<APIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId, 'average-sessions');
        setUserAverageActivityUserData({
          data: new UserAverageActivityData(
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

  if (!userAverageActivityData) return null;

  const { sessions } = userAverageActivityData.data;

  return (
    <div className={styles.container}>
      <LineChart
        width={258}
        height={263}
        data={sessions}
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
