import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Text } from 'recharts';
import styles from './RadarChartPerformance.module.scss';
import { useEffect, useState } from 'react';
import { UserPerformanceData } from '../../../services/userModels';
import { fetchUserData } from '../../../services/userService';
import { translateSubject } from '../../../services/chartService';

type APIResponse = { data: UserPerformanceData };

export const RadarChartPerformance = ({ userId }: { userId?: string }) => {
  const [userPerformanceData, setUserPerformanceData] =
    useState<APIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId, 'performance');
        setUserPerformanceData({
          data: new UserPerformanceData(
            response?.data?.data.userId,
            response?.data?.data.kind,
            response?.data?.data.data
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!userPerformanceData) return null;
  const { kind, data } = userPerformanceData.data;

  const newData = data.map((i, index) => {
    return {
      subject: translateSubject(kind[index + 1]),
      kind: i.kind,
      value: i.value,
    };
  });

  const reverseOrderOfData = Object.values(newData).reverse();

  const renderPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }) => {
    return (
      <Text
        {...rest}
        verticalAnchor="middle"
        y={y + (y - cy) / 8}
        x={x + (x - cx) / 8}
        style={{ fill: 'white', fontSize: '12px' }}
      >
        {payload.value}
      </Text>
    );
  };

  //     subject: 'Math',
  //     A: 120,
  //     B: 110,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Chinese',
  //     A: 98,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'English',
  //     A: 86,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Geography',
  //     A: 99,
  //     B: 100,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Physics',
  //     A: 85,
  //     B: 90,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'History',
  //     A: 65,
  //     B: 85,
  //     fullMark: 150,
  //   },
  // ];
  return (
    <div className={styles.radarBarChartWrapper}>
      <RadarChart
        outerRadius={70}
        width={258}
        height={263}
        data={reverseOrderOfData}
      >
        <PolarGrid gridType="polygon" radialLines={false} />
        <PolarAngleAxis
          tickLine={false}
          dataKey="subject"
          tick={props => renderPolarAngleAxis(props)}
        />
        <Radar
          name={userId}
          dataKey="value"
          stroke="#e60000"
          fill="#e60000"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
};
