import { useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { fetchMainUserData } from '../../services/userService';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import {
  ChartData,
  RadialChartScore,
} from '../../components/Charts/RadialChartScore/RadialChartScore';
import { BarChartActivity } from '../../components/Charts/BarChartActivity/BarChartActivity';
import { KeyDataCardsList } from '../../components/KeyDataCard/KeyDataCardsList';
import { LineChartAverageActivity } from '../../components/Charts/LineChartAverageActivity/LineChartAverageActivity';
import { RadarChartPerformance } from '../../components/Charts/RadarChartPerformance/RadarChartPerformance';

type UserKeyData = {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
};

type UserMainDataType = {
  firstName: string;
  keyData: UserKeyData;
  todayScore?: number;
  score?: number;
};

export const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [mainUserData, setMainUserData] = useState<
    UserMainDataType | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMainUserData(userId);

        setMainUserData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!mainUserData) return null;

  const { firstName, score, keyData } = mainUserData;

  const scoreValue = score || 0;

  const chartData: ChartData = [
    {
      name: 'Score',
      value: scoreValue * 100,
      fill: 'red',
    },
  ];

  return (
    <Navbar>
      <div className={styles.mainContainer}>
        <div className={styles.greeting}>
          <span>Bonjour</span>
          <span className={styles.name}>{`${firstName}`}</span>
        </div>
        <p className={styles.subHeading}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
        <div className={styles.contentContainer}>
          <div className={styles.chartsContainer}>
            <BarChartActivity userId={userId} />
            <div className={styles.bottomChartsContainer}>
              <LineChartAverageActivity userId={userId} />
              {typeof userId === 'string' && (
                <RadarChartPerformance userId={userId} />
              )}
              {typeof score === 'number' && (
                <RadialChartScore data={chartData} />
              )}
            </div>
          </div>
          <KeyDataCardsList keyData={keyData} />
        </div>
      </div>
    </Navbar>
  );
};
