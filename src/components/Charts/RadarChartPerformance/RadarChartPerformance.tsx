import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Text } from 'recharts';
import styles from './RadarChartPerformance.module.scss';
import { useEffect, useState } from 'react';
import { fetchUserPerformanceData } from '../../../services/userService';

type UserActivityEntry = {
  subject: string;
  kind: number;
  value: number;
};

export type UserPerformanceDataType = {
  newData: UserActivityEntry[];
};

export const RadarChartPerformance = ({ userId }: { userId?: string }) => {
  const [userPerformanceData, setUserPerformanceData] = useState<
    UserPerformanceDataType | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserPerformanceData(userId);

        setUserPerformanceData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userPerformanceData) return null;
  const { newData } = userPerformanceData;
  const reverseOrderOfData = Object.values(newData).reverse();
  const renderPolarAngleAxis = ({
    payload,
    x,
    y,
    cx,
    cy,
    ...rest
  }: {
    payload: { value: string };
    x: number;
    y: number;
    cx: number;
    cy: number;
  }) => {
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
